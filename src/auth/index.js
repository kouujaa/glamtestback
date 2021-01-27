/**
  * Auth
  *
 **/

 /**
  * Module imports
  *
 **/

// import _ from 'lodash'
// import Hoek from 'hoek'
// import Mongoose from 'mongoose'
const _ = require('lodash')
const Hoek = require('hoek')
const Mongoose = require('mongoose')

/**
 * Project imports
 *
**/

//import constants from '../constants'
const constants = require('../constants')

/**
 * Setup
 *
**/

let defaults = {
  key: null,
  verifyOptions: { algorithms: ['HS256'] },
  validateFunc: (decoded, request, callback) => {
    // validate the mongo id
    if (!Mongoose.Types.ObjectId.isValid(decoded.id)) {
      return callback(null, false)
    }

    // validate the role
    // if (!_.intersection(decoded.scope, _.values(constants.USER.ROLES)).length) {
    //   return callback(null, false)
    // }

    return callback(null, true)
  }
}

/**
  * Plugin
  *
 **/

exports.register = (server, options, next) => {
  defaults = Hoek.applyToDefaults(defaults, options)
  server.auth.strategy('jwt', 'jwt', defaults)
  next()
}

exports.register.attributes = {
  name: 'auth'
}
