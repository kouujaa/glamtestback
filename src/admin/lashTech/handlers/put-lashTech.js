const Boom = require('boom')
const Hoek = require('hoek')

const Joi = require('../../../validation')
const LashTech = require('../../../models/lashTech')
const helpers = require('../../../helpers')

let defaults = {}

const handler = async (request, reply) => {
  try {
    const lashTech = await LashTech.findByIdAndUpdate({
      _id: request.params.id
    }, request.payload,{
  		new:true,
      runValidatiors : true
  	})
    return reply({
      status: true,
      message: 'lashTech info updated successfully.',
      data: lashTech
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
  path: '/EditLashTech/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'lashTech'],
    description: 'To update lashTech details',
    notes: ['On success, returns { "data": [ { "lashTech" } ]}'],
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