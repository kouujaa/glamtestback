/**
 * Module imports
 *
 **/

const Boom = require('boom')
const Hoek = require('hoek')

/**
 * Project imports
 *
 **/
const Joi = require('../../../validation')
const makeupArtist = require('../../../models/makeupArtist')
const helpers = require('../../../helpers')



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
  console.log(request.params.id,'request.params.id')
  try {
    await makeupArtist.deleteOne({
      _id: request.params.id
    })
    return reply({
      status: true,
      message: 'Makeup Artist deleted successfully'
    })
  } catch (error) {
    return reply({
      status: false,
      message: error.message
    })
  }
}


const routeConfig = {
  method: 'DELETE',
  path: '/deleteMakeupArtist/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'makeupArtist', 'delete'],
    description: 'delete makeupArtist',
    notes: [],
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}