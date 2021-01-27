/**
 * Module imports
 *
 **/
// import _ from 'lodash'
// import Boom from 'boom'
// import Hoek from 'hoek'
// import Joi from 'joi'

const _ = require('lodash')
const Boom = require('boom')
const Hoek = require('hoek')
const Joi = require('joi')

/**
 * Project imports
 *
 **/
// import Helpers from '../../helpers'
// import Users from '../../models/users'
const Helpers = require('../../helpers')
const Users = require('../../models/users')

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
  try {
    const userId = Helpers.extractUserId(request)
    // const role = Helpers.extractUserScopes(request)
    // console.log('role ', role)
    if (!userId) {
      return reply(Boom.unauthorized('Not authorized!'))
    }
    const user = await Users.findOne({ _id: userId }).populate('role')
    if (!user) {
      return reply(Boom.unauthorized('Not authorized!'))
    }
    reply({ success: true, user })
  } catch (err) {
    console.log({ err })
    return reply(Helpers.boomify(err))
  }
}

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'POST',
  path: '/session/check',
  config: {
    auth: 'jwt',
    tags: ['api', 'session'],
    description: 'Checks for a valid user by checking the token',
    notes: ['On success, returns a token and user object'],
    response: {
      status: {
        403: Joi.any().description('User not found')
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
