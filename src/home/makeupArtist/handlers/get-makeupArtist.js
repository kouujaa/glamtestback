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

const helpers = require('../../../helpers')
const MakeupArtist = require('../../../models/makeupArtist')


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
    const data = await MakeupArtist.find({})
    return reply({
      status :true, 
      makeupArtist: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      makeupArtist: [], 
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
  path: '/getBestMakeupArtist',
  config: {
    tags: ['api', 'makeupArtist'],
    description: 'Returns a list of best makeupArtist.',
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
