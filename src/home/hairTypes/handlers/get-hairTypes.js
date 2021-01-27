/**
  * Module imports
  *
 **/

// import Hoek from 'hoek'
// import { get } from 'lodash'
const get = require('lodash/get')
const Hoek = require('hoek')
/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import HairTypes from '../../../models/hairTypes'

const helpers = require('../../../helpers')
const HairTypes = require('../../../models/hairTypes')



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
    const data = await HairTypes.find({})
    return reply({
      status :true, 
      hairTypes: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      hairTypes: [], 
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
  path: '/getBestHairTypes',
  config: {
    tags: ['api', 'hairTypes'],
    description: 'Returns a list of best hairTypes.',
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
