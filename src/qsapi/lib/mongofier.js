/**
 * System imports
 *
 **/

/**
 * Module imports
 *
 **/
// import Hoek from 'hoek'
// import Mongoose from 'mongoose'
// import _ from 'lodash'
 
const Hoek = require('hoek')
const Mongoose = require('mongoose')
const _ = require('lodash')

/**
 * Project imports
 *
 **/

class Mongofier {

  /**
   * Constructor
   *
   * @param {Mongoose.schema} schema a mongoose schema
   * @param {Object} options options for mongofying
   */
  constructor(schema, options) {
    this.schema = schema

    const defaults = {
      defaults: {
        conditions: {},
        fields: {},
        limit: null,
        order: {
          _id: 1
        },
        sort: null,
        skip: null
      }
    }

    this.options = Hoek.applyToDefaults(defaults, options || {})

  }

  mongofy(struct) {
    const built = {}

    built.conditions = this.buildConditions(struct)
    built.fields = this.buildFields(struct)
    built.sort = this.buildSort(struct)
    built.limit = this.buildLimit(struct)
    built.skip = this.buildSkip(struct)

    return built
  }

  buildConditions(struct) {
    if (!struct.filter) {
      return this.options.defaults.conditions
    }
    const filters = struct.filter.map(this.applyCasting.bind(this))
    const operator = struct.operator || 'and'
    if (operator === 'and') {
      return this.transformANDFilters(filters)
    } else {
      return this.transformORFilters(filters)
    }
  }
 
  applyCasting(filter) {
    filter.value = this.castValue(filter.value, filter.key)
    return filter
  }

  castValue(value, key) {

    const path = this.schema.path(key)

    if (!path) {
      return value
    }
    if (path instanceof Mongoose.Schema.Types.Number) {
      value = this.castValueNumber(value)
    } else if (path instanceof Mongoose.Schema.Types.Boolean) {
      value = this.castValueBoolean(value)
    }
    return value
  }

  castValueNumber(value) {
    return Number(value)
  }

  castValueBoolean(value) {
    if (value === 'true') {
      return true
    } else if (value === 'false') {
      return false
    } else {
      return Boolean(value)
    }
  }

  transformANDFilters(filters) {
    let built = {}
    const xform = this.transformFilter.bind(this)
    filters.map((filter) => {
      const ret = xform(filter)
      built = Hoek.applyToDefaults(built, ret)
    })
    return built
  }

  transformORFilters(filters) {
    return {
      '$or': filters.map(this.transformFilter)
    }
  }

  transformFilter(filter) {
    const comparator = filter.comparator
    if (comparator === 'eq') {
      const ret = {}
      ret[filter.key] = filter.value
      return ret
    }

    const comparators = ['gt', 'gte', 'lt', 'lte', 'ne']
    if (comparators.indexOf(comparator) >= 0) {
      const ret = {}
      ret[filter.key] = {}
      ret[filter.key][`$${comparator}`] = filter.value
      return ret
    }

    throw new Error(`Unsupported comparator: ${comparator}`)
  }

  buildFields(struct) {
    if (!struct.fields) {
      return this.options.defaults.fields
    }
    const built = {}
    struct.fields.map((field) => {
      built[field] = 1
    })
    return built
  }

  buildSort(struct) {

    // if (!struct.order || struct.order.length === 0) {
    if (!struct.order) {
      return this.options.defaults.sort
    }

    const built = {}
    const directions = {
      '1': 1,
      asc: 1,
      '-1': -1,
      desc: -1
    }
    _.forIn(struct.order, (v, k) => {
      built[k] = directions[v]
    })
    return built
  }

  buildLimit(struct) {
    return struct.limit || this.options.defaults.limit
  }

  buildSkip(struct) {
    if (!struct.limit) {
      return this.options.defaults.skip
    }
    const limit = struct.limit
    const page = struct.page || 1
    return limit * (page - 1)
  }
}

module.exports = Mongofier
