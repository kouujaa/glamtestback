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
// import Joi from '../../../validation'
// import SalonService from '../../../models/salonService'
// import helpers from '../../../helpers'
const Joi = require('../../../validation')
const SalonService = require('../../../models/salonService')
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
    await SalonService.deleteOne({
      _id: request.params.id
    })
    return reply({
      status: true,
      message: 'User deleted successfully'
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
  path: '/deleteSalonService/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'SalonService', 'delete'],
    description: 'delete SalonService',
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