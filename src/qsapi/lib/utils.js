/**
 * System imports
 *
 **/


/**
 * Module imports
 *
 **/
//import _ from 'lodash'
const _ = require('lodash')

/**
 * Project imports
 *
 **/
// import parse from './parse'
// import Mongofier from './mongofier'

const parse = require('./parse')
const Mongofier = require('./mongofier')

const _reassembleQuerystring = (query) => {
  const comps = []

  _.forIn(query, (v, k) => {
    comps.push(`${k}=${v}`)
  })
  return comps.join('&')
}
/**
 * Build Mongoose query components using a hapi request and a Mongoose schema
 *
 * @param {Request} request A hapi request
 * @param {Mongoose.Model} model a Mongoose model
 * @param {object} options an object of options for mongofy()
 * @returns {Object} an object with properties usable to build a Mongoose query
 */
const buildQueryComponents = (request, model, options) => {

  options = options || {}

  // request.query is already parsed. Our parser operates on the raw querystring
  // so let's reassemble it
  const qs = _reassembleQuerystring(request.query)

  // parse into a structure
  const struct = parse(qs)

  // mongofy and return
  const mongofier = new Mongofier(model.schema, options)
  return mongofier.mongofy(struct)
}

/**
 * Build Mongoose query (!) using a hapi request and a Mongoose schema
 *
 * @param {Request} request A hapi request
 * @param {Mongoose.Model} model a Mongoose model
 * @param {object} options an object of options for mongofy()
 * @returns {Mongoose.Query} an object with properties usable to build a Mongoose query
 */
const buildQuery = (request, model, options) => {

  const struct = buildQueryComponents(request, model, options)
  const query = model.find(struct.conditions, struct.fields)
  if (struct.sort) {
    query.sort(struct.sort)
  }
  if (struct.limit) {
    query.limit(struct.limit)
  }
  if (struct.skip) {
    query.skip(struct.skip)
  }

  return query
}

module.exports = {
  buildQueryComponents,
  buildQuery
}
