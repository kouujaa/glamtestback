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

const handler = (request, reply) => {
  console.log(request.params,'request.paramsrequest.params')
  const userId = request.params.id
  const decodedUserId = String(helpers.extractUserId(request))
  console.log(decodedUserId, 'decodedUserId')

  // const isAdmin = helpers.isAdmin(request)

  /*if (!isAdmin && requestUserId !== decodedUserId) {
    return reply(Boom.forbidden(`You are not authorized to access ${decodedUserId}`))
  }
*/
  return Users.findOne({ _id: userId })
    .then((user) => {
      if (!user) return reply(Boom.notFound('No user found'))

      return reply(user)
    })
    .catch((err) => {
      return reply(Boom.badRequest(err.message))
    })
}

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'GET',
  path: '/users/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'users'],
    description: 'Returns a user specified by {userId}.',
    notes: [],
    validate: {
      params: {
        userId: Joi.objectId().required()
      }
    },
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
