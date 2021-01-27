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
    const nailTech = await NailTech.findByIdAndUpdate({
      _id: request.params.id
    }, request.payload,{
  		new:true,
      runValidatiors : true
  	})
    return reply({
      status: true,
      message: 'NailTech info updated successfully.',
      data: nailTech
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
  path: '/EditNailTechs/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'nailTech'],
    description: 'To update nailTech details',
    notes: ['On success, returns { "data": [ { "nailTech" } ]}'],
    validate: {
      payload: {
        title: Joi.string().optional(),
        subtitle: Joi.string().optional(),
        description: Joi.any().optional(),
        image: Joi.any().optional(), 
        _id: Joi.any().optional() 
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}