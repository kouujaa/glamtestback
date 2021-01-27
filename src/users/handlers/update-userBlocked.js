/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
// import bcrypt from 'bcrypt'
// import _ from 'lodash'
const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const bcrypt = require('bcrypt')
/**
 * Project imports
 *
 **/

// import Joi from '../../validation'
// import Users from '../../models/users'
// import helpers from '../../helpers'
const Joi = require('../../validation')
const Users = require('../../models/users')
const helpers = require('../../helpers')


/**
 * Setup
 *
 **/

let defaults = {}

/**
 * Handler
 *
 **/

const handler = async (request, reply) => {
  const payload = request.payload
  const status = {
    isActive : payload.status
  }
  try {
    const data = await Users.findOneAndUpdate({
      _id: payload._id
    }, status )
    return reply({
      status: true,
      message: 'user Update successfully.',
      data: data
    })
  } catch (error) {
    return reply({
      status: false,
      message: error.message,
      data: {}
    })
  }
}

const routeConfig = {
  method: 'PUT',
  path: '/UpdateUserStatus',
  config: {
    auth: 'jwt',
    tags: ['api', 'Update User Blocked'],
    description: 'To Update User Blocked details',
    notes: ['On success, returns { "data": [ { "User" } ]}'],
    // validate: {
    //   payload: {
        
    //   }
    // },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
