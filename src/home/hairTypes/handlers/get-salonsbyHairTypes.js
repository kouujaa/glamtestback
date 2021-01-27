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
  console.log(request.query,'request.query')
  const value = request.query
  try {
    const data = await Salons.aggregate([{
                              "$match" : { 
                                "$and" :[ { "isActive" : true },
                                          { "hairType" : value.hairType }
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
  path: '/getSalonsByHairTypes',
  config: {
    tags: ['api', 'get Salons By HairTypes'],
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
