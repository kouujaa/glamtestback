/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
// import _ from 'lodash'
// import { get } from 'lodash'

const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const get = require('lodash/get')

/**
 * Project imports
 *
 **/

//import { uploadImage } from '../../services/aws'
const uploadImage = require('../../services/aws')
const Joi = require('../../validation')
const Users = require('../../models/users')
const helpers = require('../../helpers')

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
    let ImageUrl

    if((payload.image).length > 0 && payload.image[0].name){
      //const url  = await uploadImage(payload.image[0])
      ImageUrl = [{ Location : payload.image[0].imagePreviewUrl }] //get(url, "data", "")
    } else if(payload.image[0].imagePreviewUrl === '/images/profile.png'){
      ImageUrl = [{ Location : '/images/profile.png' }]
    } else {
      ImageUrl = payload.previousPhoto
    }


    if(ImageUrl){
      const updateUser = {
        profile: {
          firstName: _.get(payload, 'profile.firstName', ''),
          lastName: _.get(payload, 'profile.lastName', ''),
          mobile: payload.profile.mobile.replace(/[^\d]/g, ''),
          email: _.get(payload, 'profile.email', '')
        },
        userName: _.get(payload, 'userName', ''),
        preferredHairStyle: _.get(payload, 'preferredHairStyle', []),
        preferredHairType: _.get(payload, 'hairType', []),
        image: ImageUrl
      }

      const user = await Users.findByIdAndUpdate({
        _id: request.payload._id
      }, updateUser )
      return reply({
        status: true,
        message: 'User info updated successfully.',
        data: user
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
  path: '/EditUser',
  config: {
    auth: 'jwt',
    tags: ['api', 'User'],
    description: 'To update User details',
    notes: ['On success, returns { "data": [ { "User" } ]}'],
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