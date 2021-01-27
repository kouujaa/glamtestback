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

// import helpers from '../../../helpers'
// import PricePoints from '../../../models/pricePoints'
const PricePoints = require('../../../models/pricePoints')
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
  await PricePoints.find({})
  .then((data) => {
    reply({success:true, PricePoints: data})
  })
  .catch((err) => {
    reply({ success:false, PricePoints: [], message: err.message })
  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getPricePoints',
  config: {
    auth: 'jwt',
    tags: ['api', 'PricePoints'],
    description: 'Returns a list of PricePoints.',
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
