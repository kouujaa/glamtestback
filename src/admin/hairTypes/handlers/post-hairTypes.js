/**
 * Module imports
 *
 **/

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
// import HairTypes from '../../../models/hairTypes'
// import helpers from '../../../helpers'
// import Joi from '../../../validation'
const Joi = require('../../../validation')
const HairTypes = require('../../../models/hairTypes')
const helpers = require('../../../helpers')
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

const handler = async(request, reply) => {
  console.log(request.payload, 'request.payload')
  try {
    const payload = request.payload 

    if((payload.image).length > 0){
      
      // const ImageUrl = await Promise.all(
      //   map(get(payload, "image", []), async (val,i)=>{
      //       const url  = await uploadImage(val)
      //       return get(url, "data", "")
      //     })
      // )

      const ImageUrl = payload.image

      const data = {
        title: _.get(payload, 'title', ''),
        subtitle: _.get(payload, 'subtitle', ''),
        description: _.get(payload, 'description', ''),
        image: ImageUrl
      }
      const hairTypesData = await new HairTypes(data)
      await hairTypesData.save()
      return reply({
        status: true,
        message: 'created successfully'
      })
    }else{
      let ImageData = [{ Location : '/images/User_male.png' }]
      const data = {
        title: _.get(payload, 'title', ''),
        subtitle: _.get(payload, 'subtitle', ''),
        description: _.get(payload, 'description', ''),
        image: ImageData
      }
      console.log(data,'data')
      const hairTypesData = await new HairTypes(data)
      console.log(hairTypesData,'hairTypesData')
      await hairTypesData.save()
      return reply({
        status: true,
        message: 'created successfully'
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

/**
 * Route config
 *
 **/

const routeConfig = {
  method: 'POST',
  path: '/hairTypes',
  config: {
    auth: 'jwt',
    tags: ['api', 'hairTypes'],
    description: 'Create hairTypes',
    notes: ['On success'],
    validate: {
      payload: {
        image: Joi.any()
          .optional(),
        title: Joi.string()
          .required()
          .error(new Error('title is required')),
        subtitle: Joi.string()
          .required()
          .error(new Error('subtitle is required')),
        description: Joi.string()
          .required()
          .error(new Error('description is required')),
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
''