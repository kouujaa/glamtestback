/**
 * Module imports
 *
 **/

const Boom = require('boom')
const Hoek = require('hoek')
/**
 * Project imports
 *
 **/

// import Salons from '../../../models/salons'
// import SalonService from '../../../models/salonService'
// import helpers from '../../../helpers'
// import Joi from '../../../validation'

const Joi = require('../../../validation')
const SalonService = require('../../../models/salonService')
const Salons = require('../../../models/salons')
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
  try {
    const payload = request.payload
    
    const SalonServiceDetail = await new SalonService(payload)
    await SalonServiceDetail.save()
    
    await Salons.findOneAndUpdate(
      {
        _id: payload.salonId
      },
      {
        $push: {
          salonServiceId: SalonServiceDetail._id
        }
      }
    )
    return reply({
      status: true,
      message: 'created successfully'
    })
  } catch (error) {
    console.log({ error })
    return {
      status: false,
      message: error.message,
      data: {}
    }
  }
}

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'POST',
  path: '/addSalonService',
  config: {
    auth: 'jwt',
    tags: ['api', 'SalonService'],
    description: 'Create SalonService',
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
