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

const Joi = require('../../../validation')
const HairTypes = require('../../../models/hairTypes')
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
    const hairTypes = await HairTypes.findByIdAndUpdate({
      _id: request.params.id
    }, request.payload,{
  		new:true,
  		runValidatiors : true
  	})
    return reply({
      status: true,
      message: 'HairTypes info updated successfully.',
      data: hairTypes
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
  path: '/EditHairTypes/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'HairTypes'],
    description: 'To update HairTypes details',
    notes: ['On success, returns { "data": [ { "HairTypes" } ]}'],
    validate: {
      payload: {
        title: Joi.string().optional(),
        subtitle: Joi.string().optional(),
        description: Joi.any().optional(),
        image:Joi.any().optional(),
        _id:Joi.any().optional()
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}