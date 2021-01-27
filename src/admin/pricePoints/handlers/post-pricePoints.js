/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'

const Boom = require('boom')
const Hoek = require('hoek')

/**
 * Project imports
 *
 **/

// import Joi from '../../../validation'
// import PricePoints from '../../../models/pricePoints'
// import helpers from '../../../helpers'

const Joi = require('../../../validation')
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

const handler = async(request, reply) => {
  const data = request.payload
  console.log(data, 'PricePoints')
  try {
    const PricePointsData = await new PricePoints(data)
    await PricePointsData.save()
    return reply({
      status: true,
      message: 'created successfully'
    })
  } catch (error) {
    return reply({
      status: false,
      message: error.message,
      data: {}
    })
  }
}

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'POST',
  path: '/PricePoints',
  config: {
    auth: 'jwt',
    tags: ['api', 'PricePoints'],
    description: 'Create PricePoints',
    notes: ['On success'],
    validate: {
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}