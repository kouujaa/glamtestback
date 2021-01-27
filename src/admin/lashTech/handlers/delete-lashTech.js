const Boom = require('boom')
const Hoek = require('hoek')

const Joi = require('../../../validation')
const LashTech = require('../../../models/lashTech')
const helpers = require('../../../helpers')

let defaults = {}

const handler = async (request, reply) => {
  try {
    await LashTech.deleteOne({
      _id: request.params.id
    })
    return reply({
      status: true,
      message: 'LashTech deleted successfully'
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
  path: '/deleteLashTech/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'lashTech', 'delete'],
    description: 'delete lashTech',
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