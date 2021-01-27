/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
const Boom = require('boom')
const Hoek = require('hoek')

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

const handler = async(request, reply) => {
  const payload = request.payload
  console.log('payload >>>>>>>>>>>>>', payload)
  const user = await Users.findOneAndUpdate(
      {
        $or: [
          { 'profile.email': payload.profile.email },
          { 'userName': payload.userName }
        ]
      },
      { $set: {
          profile: payload.profile,
          userName: payload.userName
        }
      },
      {
        upsert: true
      })
  if (!user) {
    const res = await Users.create(payload)
    if (!res) {
      reply({success: false, message: 'Something went wrong!'})
    }
    reply({success: true, message: 'User created!'})
  } else {
    reply({success: false, message: 'User already exist!'})
  }
}

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'POST',
  path: '/users',
  config: {
    // auth: 'jwt',
    tags: ['api', 'users'],
    description: 'Create user',
    notes: [],
    /* validate: {
      payload: {
        profile: Joi.object().required()
      }
    }, */
    response: {
      status: {
        403: Joi.any().description('You are not authorized to access'),
        404: Joi.any().description('User not found')
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
