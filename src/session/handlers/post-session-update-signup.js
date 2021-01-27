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

const Helpers = require('../../helpers')
const Users = require('../../models/users')
const Joi = require('../../validation')

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
  console.log('payload >>>>>>>>>>>>>', payload)
  const user = await Users.findOneAndUpdate(
    {
      $or: [
        { 'profile.email': payload.profile.email },
        { userName: payload.userName }
      ]
    },
    {
      $set: {
        profile: payload.profile,
        userName: payload.userName,
        password: payload.password
      }
    },
    {
      upsert: true
    }
  )
  if (!user) {
    return reply({ success: false, message: 'Something went wrong!' })
  }
  return reply({ success: true, message: 'User created!' })
}

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'POST',
  path: '/session/update/signup',
  config: {
    // auth: 'jwt',
    tags: ['api', 'session'],
    description: 'User Signup',
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
