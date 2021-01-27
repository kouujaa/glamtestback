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
// import Ratings from '../../../models/ratings'
// import Salons from '../../../models/salons'
// import helpers from '../../../helpers'
const Joi = require('../../../validation')
const Ratings = require('../../../models/ratings')
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
  const userId = helpers.extractUserId(request)
  // console.log(userId,'userId')
  const data = request.payload
  // console.log(data, 'requesttt')
  try {
    const RatingsData = await new Ratings(data)
    await RatingsData.save()
    
    await Salons.findOneAndUpdate(
      {
        _id: data.salonsId
      },
      {
        $push: {
          ratingId: RatingsData._id
        }
      }
    )
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
  path: '/addRatings',
  config: {
    auth: 'jwt',
    tags: ['api', 'Add Ratings'],
    description: 'Add New Ratings',
    notes: ['On success'],
    validate: {
    },
    handler
  }
}

module.exports =  (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
