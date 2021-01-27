/**
  * Module imports
  *
 **/

// import _ from 'lodash'
// import Hoek from 'hoek'
const _ = require('lodash')
const Hoek = require('hoek')

/**
  * Project imports
  *
 **/

// import Joi from '../../../validation'
// import helpers from '../../../helpers'
// import Salons from '../../../models/salons'

const Joi = require('../../../validation')
const Salons = require('../../../models/salons')
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
    await Salons.deleteOne({
      _id: request.params.id
    })
    return reply({
      status: true,
      message: 'Salons deleted successfully'
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
  path: '/deleteSalons/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'Salons', 'delete'],
    description: 'delete Salons',
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