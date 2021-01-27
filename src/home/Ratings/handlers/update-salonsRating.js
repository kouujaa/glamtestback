/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
// import _ from 'lodash'
// import Mongoose from 'mongoose'
const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const Mongoose = require('mongoose')

/**
 * Project imports
 *
 **/

// import Joi from '../../../validation'
// import Salons from '../../../models/salons'
// import Ratings from '../../../models/ratings'
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

function float2int (value) {
  return value | 0;
}

const handler = async (request, reply) => {
  try {
    const updateRating = await Ratings.aggregate([
                    {
                      $match: {
                        "salonsId": new Mongoose.Types.ObjectId(request.payload.salonsId) 
                      }
                    },
                    {
                      $group: {
                        _id: "$salonsId",
                        totalRating: {
                          $sum: "$rating"
                        },
                        count: {
                          $sum: 1
                        }
                      }
                    }
                  ])

    console.log(updateRating,'updateRating')

    let ratings = updateRating[0].totalRating / updateRating[0].count

    const updateSalons = {
      rating : float2int(ratings)
    }
    
    console.log(updateSalons,'updateSalons')
    
    const salons = await Salons.findByIdAndUpdate({
      _id: new Mongoose.Types.ObjectId(request.payload.salonsId)
    }, updateSalons,{
      new:true,
      runValidatiors : true
    })

    console.log(salons,'salons')
    return reply({
      status: true,
      message: 'Upgrade Salons Rating successfully.',
      data: salons
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
  path: '/UpgradeSalonsRating',
  config: {
    auth: 'jwt',
    tags: ['api', 'Upgrade Salons Rating'],
    description: 'To Upgrade Salons Rating',
    notes: ['On success, returns { "data": [ { "Salons Rating" } ]}'],
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