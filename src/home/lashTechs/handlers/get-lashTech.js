const get = require('lodash/get')
const Hoek = require('hoek')

const helpers = require('../../../helpers')
const lashTech = require('../../../models/lashTech')

let defaults = {}

const handler = async (request, reply) => {
   try {
    const data = await lashTech.find({})
    return reply({
      status :true, 
      lashTech: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      lashTech: [], 
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
  path: '/getBestLashTech',
  config: {
    tags: ['api', 'lashTech'],
    description: 'Returns a list of best lashTech.',
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
