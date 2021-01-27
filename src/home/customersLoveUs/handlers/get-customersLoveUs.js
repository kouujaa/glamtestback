/**
  * Module imports
  *
 **/

// import { get } from 'lodash'
// import Hoek from 'hoek'
const get = require('lodash/get')
const Hoek = require('hoek')

/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import Salons from '../../../models/salons'
const helpers = require('../../../helpers')
const Salons = require('../../../models/salons')


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
    const limit = 6
    const data = await Salons
                .find({})
                .limit(limit)

    return reply({
      status :true, 
      salons: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      salons: [], 
      message: err.message
    })
  }
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/customersLoveUs',
  config: {
    tags: ['api', 'Salons'],
    description: 'Returns a list of Salons.',
    notes: [],
   validate: {
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
