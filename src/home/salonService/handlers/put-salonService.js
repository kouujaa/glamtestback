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
// import SalonService from '../../../models/salonService'
// import helpers from '../../../helpers'
const Joi = require('../../../validation')
const SalonService = require('../../../models/salonService')
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
  try {
    const SalonServiceDetail = await SalonService.findByIdAndUpdate({
      _id: request.params.id
    }, request.payload )
    return reply({
      status: true,
      message: 'SalonService info updated successfully.',
      data: SalonServiceDetail
    })
  } catch (error) {
    return reply({
      status: false,
      message: error.message,
      data: {}
    })
  }
}

const routeConfig = {
  method: 'PUT',
  path: '/editSalonService/{id}',
  config: {
    auth: 'jwt',
    tags: ['api', 'SalonServiceDetail'],
    description: 'To update SalonServiceDetail details',
    notes: ['On success, returns { "data": [ { "SalonServiceDetail" } ]}'],
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}