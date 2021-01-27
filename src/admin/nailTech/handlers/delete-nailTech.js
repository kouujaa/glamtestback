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
const NailTech = require('../../../models/nailTech')
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
  try {
    await NailTech.deleteOne({
      _id: request.params.id
    })
    return reply({
      status: true,
      message: 'Nail Tech deleted successfully'
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
  path: '/deleteNailTechs/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'nailTech', 'delete'],
    description: 'delete nailTech',
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