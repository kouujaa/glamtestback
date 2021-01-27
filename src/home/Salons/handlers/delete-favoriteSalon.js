const Boom = require('boom')
const Hoek = require('hoek')

const Joi = require('../../../validation')
const FavoriteSalon = require('../../../models/favoriteSalon')
const helpers = require('../../../helpers')

let defaults = {}

const handler = async(request, reply) => {
    try {
        await FavoriteSalon.deleteOne({
          _id: request.params.id
        })
        return reply({
          status: true,
          message: 'Salon deleted successfully'
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
    path: '/deleteFavoriteSalon/{id}',
    config: {
      auth: 'jwt',
      tags: ['api', 'favoriteSalon', 'delete'],
      description: 'delete favoriteSalon',
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