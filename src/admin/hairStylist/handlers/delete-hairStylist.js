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
// import hairStylist from '../../../models/hairStylist'
// import helpers from '../../../helpers'
const Joi = require('../../../validation')
const hairStylist = require('../../../models/hairStylist')
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
    await hairStylist.deleteOne({
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
  path: '/deleteHairStylist/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'hairStylist', 'delete'],
    description: 'delete hairStylist',
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