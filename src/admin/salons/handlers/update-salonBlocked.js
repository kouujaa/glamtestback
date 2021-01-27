/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
// import _ from 'lodash'
const _ = require('lodash')
const Hoek = require('hoek')
const Boom = require('boom')
/**
 * Project imports
 *
 **/

// import Joi from '../../../validation'
// import Salons from '../../../models/salons'
// import Users from '../../../models/users'
// import helpers from '../../../helpers'
const Salons = require('../../../models/salons')
const helpers = require('../../../helpers')
const Users = require('../../../models/users')
const Joi = require('../../../validation')

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
    const payload = request.payload
    const status = {
      isActive : payload.status
    }
    const data = await Salons.findOneAndUpdate({
      _id: payload._id
    }, status )

    const datanew = await Users.findOneAndUpdate({
      salonId : payload._id
    }, status ) 

    return reply({
      status: true,
      message: 'Salons info updated successfully.',
      data: data
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
  path: '/UpdateSalonsStatus',
  config: {
    auth: 'jwt',
    tags: ['api', 'Salons'],
    description: 'To update Salons details',
    notes: ['On success, returns { "data": [ { "Salons" } ]}'],
    // validate: {
    //   payload: {
        
    //   }
    // },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}