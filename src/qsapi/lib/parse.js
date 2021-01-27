/**
 * System imports
 *
 **/


/**
 * Module imports
 *
 **/
// import _ from 'lodash'
// import qsParser from 'qs'

const _ = require('lodash')
const qsParser = require('qs')

/**
 * Project imports
 *
 **/
//import ParseError from './parse-error'
const ParseError = require('./parse-error')

const validComparators = [ 'eq', 'gt', 'gte', 'lt', 'lte' ]

const extractDeepComparator = (value) => {
  let comparator = null
  let valueSet = false
  if (typeof value === 'object') {
    Object.keys(value).forEach((k) => {
      comparator = k
      if (validComparators.indexOf(k) < 0) {
        throw new ParseError(`Invalid filter comparator (${comparator})`)
      } else if (!valueSet) {
        valueSet = true
        value = value[comparator]
      }
    })
  }
  return {
    comparator,
    value
  }
}

/**
 * Create an array of filter condition objects
 *
 * @param {Object} parsed the raw parsed result
 * @returns {Object} the filter payload
 */
const buildFilter = (parsed) => {
  if (!parsed.filter) {
    return null
  }

  if (typeof parsed.filter === 'string') {
    throw new ParseError('filter must be a collection of key-value pairs, as in ?filter[k1]=v1')
  }

  const built = []

  _.forIn(parsed.filter, (value, key) => {
    let comparator = 'eq'

    if (typeof value === 'object') {
      const pair = extractDeepComparator(value)
      comparator = pair.comparator || comparator
      value = pair.value
    }
    built.push({
      key,
      value,
      comparator
    })
  })

  return built
}

/**
 * Build fields payload
 *
 * @param {object} parsed the raw parsed result
 * @returns {Object} the fields payload
 */
const buildFields = (parsed) => {
  if (!parsed.fields || parsed.fields.length === 0) {
    return null
  }
  return parsed.fields.split(',')

}

const normalizeDirection = (dir) => {
  dir = dir.replace(' ', '').toLowerCase()
  const map = {
    '1': 'asc',
    'asc': 'asc',
    '-1': 'desc',
    'desc': 'desc'
  }
  if (!map[dir]) {
    throw new ParseError(`Unsupported direction: ${dir}`)
  }
  return map[dir]
}

/**
 * Build order payload
 *
 * @param {object} parsed the raw parsed result
 * @returns {Object} the order payload
 */
const buildOrder = (parsed) => {
  if (!parsed.order) {
    return null
  }
  const built = {}

  // create an iterator to populate built, just to keep the indenting scope/levels under control
  const iterator = (term) => {
    if (term.indexOf(':') < 0) {
      throw new ParseError('Missing colon in order specification')
    }
    const maxComps = 2
    const comps = term.split(':')
    if (comps.length > maxComps) {
      throw new ParseError(`Too many colon-delimited components in order specification: ${term}`)
    }
    const field = comps[0]
    const dir = normalizeDirection(comps[1])

    built[field] = dir
  }

  // map over the order components, apply the iterator
  parsed.order.split(',').map(iterator)
  return built

}

const checkForPositiveInteger = (name, value) => {
  if (!value) {
    return null
  }

  const error = `Invalid ${name} (${value}). ${name} must be positive integer`
  const parsed = parseInt(value, 10)

  if (isNaN(parsed)) {
    throw new ParseError(error)
  }
  if (parsed <= 0) {
    throw new ParseError(error)
  }

  return parsed
}

const buildLimit = (parsed) => {
  return checkForPositiveInteger('Limit', parsed.limit)
}

const buildPage = (parsed) => {
  return checkForPositiveInteger('Page', parsed.page) || 1
}

const buildOperator = (parsed) => {
  if (!parsed.operator) {
    return 'and'
  }
  if (typeof parsed.operator !== 'string') {
    throw new ParseError(`Invalid operator (${parsed.operator}). Valid values: and, or`)
  }
  const validOperators = ['and', 'or']
  if (validOperators.indexOf(parsed.operator) < 0) {
    throw new ParseError(`Invalid operator (${parsed.operator}). Valid values: and, or`)
  }
  return parsed.operator
}

/**
 * Massage the raw qs parse result
 *
 * @param {Object} parsed the raw parsed object
 * @returns {Object} a massaged result
 */
const massage = (parsed) => {

  const massaged = {}

  massaged.filter = buildFilter(parsed)
  massaged.fields = buildFields(parsed)
  massaged.order = buildOrder(parsed)
  massaged.limit = buildLimit(parsed)
  massaged.page = buildPage(parsed)
  massaged.operator = buildOperator(parsed)

  return massaged
}

/**
 * Parse querystring
 *
 * @param {String} qs querystring
 * @returns {Object} object representing the querystring parse
 */
const parse = (qs) => {
  // const defaults = {}
  // opts = Hoek.applyToDefaults(defaults, opts)

  const parsed = qsParser.parse(qs)
  return massage(parsed)
}

module.exports = parse
