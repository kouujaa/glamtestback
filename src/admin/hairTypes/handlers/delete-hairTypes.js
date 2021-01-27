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
// import HairTypes from '../../../models/hairTypes'

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
    await HairTypes.deleteOne({
      _id: request.params.id
    })
    return reply({
      status: true,
      message: 'HairTypes deleted successfully'
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
  path: '/deleteHairTypes/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'HairTypes', 'delete'],
    description: 'delete HairTypes',
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