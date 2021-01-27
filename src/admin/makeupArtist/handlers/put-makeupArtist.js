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
const MakeupArtist = require('../../../models/makeupArtist')
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
    const makeupArtist = await MakeupArtist.findByIdAndUpdate({
      _id: request.params.id
    }, request.payload,{
  		new:true,
      runValidatiors : true
  	})
    return reply({
      status: true,
      message: 'makeupArtist info updated successfully.',
      data: makeupArtist
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
  path: '/EditMakeupArtist/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'makeupArtist'],
    description: 'To update makeupArtist details',
    notes: ['On success, returns { "data": [ { "makeupArtist" } ]}'],
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