/**
 * System imports
 **/

/**
 * Module imports
 **/
// import parse from './lib/parse'
// import ParseError from './lib/parse-error'
// import Mongofier from './lib/mongofier'
// import utils from './lib/utils'

const parse = require('./lib/parse')
const ParseError = require('./lib/parse-error')
const Mongofier = require('./lib/mongofier')
const utils = require('./lib/utils')

/**
 * Project imports
 **/

module.exports = {
  parse,
  ParseError,
  Mongofier,
  utils
}
