/**
  * Validation
  *
 **/
// import bluebird from 'bluebird'
// import Joi from 'joi'
// import ObjectId from 'joi-objectid'

const bluebird = require('bluebird')
const Joi = require('joi')
const ObjectId = require('joi-objectid')
Joi.objectId = ObjectId(Joi)
bluebird.promisifyAll(Joi)


module.exports = Joi
