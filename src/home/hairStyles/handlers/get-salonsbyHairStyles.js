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
  console.log(request.query,'request.query')
  const value = request.query
   try {
    const data = await Salons.aggregate([{
                              "$match" : { 
                                "$and" :[ { "isActive" : true },
                                          { "hairstyleServices" : value.hairStyles }
                                        ]
                                      }
                              }])
    return reply({
      status :true, 
      Salons: data 
    })
  } catch (error) {
    return reply({
      status :false, 
      Salons: [], 
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
  path: '/getSalonsByHairStyles',
  config: {
    tags: ['api', 'get Salons By HairStyles'],
    description: 'Returns a list of best Salons.',
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
