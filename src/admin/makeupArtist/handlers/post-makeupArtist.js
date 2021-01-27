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

const Joi = require('../../../validation')
const makeupArtist = require('../../../models/makeupArtist')
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
  try {
    const payload = request.payload

    if((payload.image).length > 0){

    //   const ImageUrl = await Promise.all(
    //     map(get(payload, "image", []), async (val,i)=>{
    //         const url  = await uploadImage(val)
    //         console.log(url,'url')
    //         return get(url, "data", "")
    //       })
    //   )

    const ImageUrl = payload.image

      const data = {
        title: _.get(payload, 'title', ''),
        subtitle: _.get(payload, 'subtitle', ''),
        description: _.get(payload, 'description', ''),
        image: ImageUrl
      }
      const makeupArtistData = await new makeupArtist(data)
      await makeupArtistData.save()
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
      const makeupArtistData = await new makeupArtist(data)
      await makeupArtistData.save()
      return reply({
        status: true,
        message: 'created successfully'
      })
    }
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
  path: '/makeupArtist',
  config: {
    auth: 'jwt',
    tags: ['api', 'makeupArtist'],
    description: 'Create makeupArtist',
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
