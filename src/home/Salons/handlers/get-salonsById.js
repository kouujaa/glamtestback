/**
  * Module imports
  *
 **/

// import { get } from 'lodash'
// import Hoek from 'hoek'
const get = require('lodash/get')
const Hoek = require('hoek')
const Boom = require('boom')

/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import Salons from '../../../models/salons'
const helpers = require('../../../helpers')
const Salons = require('../../../models/salons')
const User = require('../../../models/users')


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
  // console.log(request,'request')
  const salonsId = helpers.extractUserId(request)
  //console.log(salonsId,'salonsId')

  if (!salonsId) {
    return reply(Boom.unauthorized('Not authorized!'))
  }

  // return Salons.findOne({ userId: salonsId })
  //                   .populate( "ratingId" )
  //                   .populate( "newRatingId" )
  //                   .populate( "salonServiceId" )
  // .then((data) => {
  //   reply({
  //     status:true, 
  //     salons: data
  //   })
  // })
  // .catch((err) => {
  //   reply({ 
  //     status:false, 
  //     salons: [], 
  //     message: err.message 
  //   })
  // })
  try {
    const data = await Salons.findOne({ userId: salonsId })
                              .populate( "ratingId" )
                              .populate( "newRatingId" )
                              .populate( "salonServiceId" )
    const userdata = await User.findOne({ _id: salonsId })
    return reply({
      status:true, 
      salons: data,
      user: userdata
    })  
  } catch (error) {
    return reply({ 
      status:false, 
      salons: [], 
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
  path: '/getSalonsDataById',
  config: {
    auth: 'jwt',
    tags: ['api', 'Salons'],
    description: 'Returns a list of Salons.',
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
