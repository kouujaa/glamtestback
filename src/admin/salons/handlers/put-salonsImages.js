/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
// import _ from 'lodash'
// import { get, map } from 'lodash'
const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const get = require('lodash/get')
const map = require('lodash/map')

/**
 * Project imports
 *
 **/
// import { uploadImage } from '../../../services/aws'
// import Joi from '../../../validation'
// import Salons from '../../../models/salons'
// import helpers from '../../../helpers'

const Salons = require('../../../models/salons')
const helpers = require('../../../helpers')
const Joi = require('../../../validation')
const uploadImage = require('../../../services/aws')

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
  // console.log(request.payload,'request.payload')
  try {
    const payload = request.payload
    if((payload.image).length > 0){

      const imageData = await Promise.all(
        map(get(payload, "image", []), async (val,i)=>{
            const url  = await uploadImage(val)
            console.log(url,'url')
            return { 'thumbUrl' : get(url, "data", "")}
          })
      )

      const data = {
        SalonsImage: imageData
      }

      const salons = await Salons.findOneAndUpdate({
        _id: payload._id
      }, data )

      return reply({
        status: true,
        message: 'Salons Images updated successfully.',
        data: salons
      })
    }
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
  path: '/UpdateSalonsImages',
  config: {
    auth: 'jwt',
    tags: ['api', 'Salons'],
    description: 'To update Salons Images',
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