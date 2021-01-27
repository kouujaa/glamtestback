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
const NailTech = require('../../../models/nailTech')


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
    const data = await NailTech.find({})
    return reply({
      status :true, 
      nailTechs: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      nailTechs: [], 
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
  path: '/getBestNailTechs',
  config: {
    tags: ['api', 'NailTechs'],
    description: 'Returns a list of best nailTechs.',
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
