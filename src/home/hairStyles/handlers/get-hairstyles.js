/**
  * Module imports
  *
 **/

const get = require('lodash/get')
const Hoek = require('hoek')
/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import HairStylist from '../../../models/hairStylist'
const helpers = require('../../../helpers')
const HairStylist = require('../../../models/hairStylist')


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
    const data = await HairStylist.find({})
    return reply({
      status :true, 
      hairStylist: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      hairStylist: [], 
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
  path: '/getBestHairStylist',
  config: {
    tags: ['api', 'hairStylist'],
    description: 'Returns a list of best hairStylist.',
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
