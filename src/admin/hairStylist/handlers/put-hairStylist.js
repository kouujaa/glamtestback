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
// import HairStylist from '../../../models/hairStylist'
// import helpers from '../../../helpers'
const Joi = require('../../../validation')
const HairStylist = require('../../../models/hairStylist')
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
    const hairStylist = await HairStylist.findByIdAndUpdate({
      _id: request.params.id
    }, request.payload,{
  		new:true,
      runValidatiors : true
  	})
    return reply({
      status: true,
      message: 'hairStylist info updated successfully.',
      data: hairStylist
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
  path: '/EditHairStylist/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'hairStylist'],
    description: 'To update hairStylist details',
    notes: ['On success, returns { "data": [ { "hairStylist" } ]}'],
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