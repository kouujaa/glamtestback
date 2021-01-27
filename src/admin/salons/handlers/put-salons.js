/**
 * Module imports
 *
 **/
// import fs from 'fs'
// import Boom from 'boom'
// import Hoek from 'hoek'
// import _ from 'lodash'
// import { get, map } from 'lodash'

const fs = require('fs')
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
// import Users from '../../../models/users'
// import helpers from '../../../helpers'

const Salons = require('../../../models/salons')
const helpers = require('../../../helpers')
const Users = require('../../../models/users')
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
    let ImageUrl, newSalonsImage = [], imageData, newBannerImage = []

    if((payload.image).length > 0 && payload.image[0].name){
      //const url  = await uploadImage(payload.image[0])
      ImageUrl = payload.image[0] //get(url, "data", "")
    } else if(payload.image[0].imagePreviewUrl === '/images/profile.png'){
      ImageUrl = [{ Location : '/images/profile.png' }]
    } else {
      ImageUrl = payload.previousPhoto
    }

    if((payload.newSalonsPicture).length > 0){

      newSalonsImage = payload.newSalonsPicture

      // imageData = await Promise.all(
      //   map(get(payload, "newSalonsPicture", []), async (val,i)=>{
      //     const urls  = await uploadImage(val)
      //     return get(urls, "data", "")
      //   })
      // )
      // imageData.map((val,i)=>{
      //   return(
      //     newSalonsImage.push(val)
      //   )
      // })
    }else{
      newSalonsImage.push({ Location : '/images/Hairtype.png', Etag : 'demo' })
    }
    if((payload.bannerPicture).length > 0){
      newBannerImage = payload.bannerPicture
    }else{
      newBannerImage.push({ Location : '/images/salon.jpg', Etag : 'demo' })
    }

    // if((payload.salonsPicture).length > 0){
    //   newSalonsImage = payload.salonsPicture
    // } 

    if(ImageUrl || newSalonsImage.length > 0){
      const updateSalons = {
        firstName: _.get(payload, 'profile.firstName', ''),
        lastName: _.get(payload, 'profile.lastName', ''),
        email: _.get(payload, 'profile.email', ''),
        mobile: _.get(payload, 'profile.mobile', ''),
        salonName: _.get(payload, 'salon.salonName', ''),
        salonAddress: _.get(payload, 'salon.salonAddress', ''),
        instagramName: _.get(payload, 'salon.instagramName', ''),
        facebookName: _.get(payload, 'salon.facebookName', ''),
        website: _.get(payload, 'salon.website', ''),
        pricePoints : _.get(payload, 'pricePoints', ''),
        hairstyleServices : _.get(payload, 'hairstyleServices', []),
        hairType : _.get(payload, 'hairType', []),
        startTime : _.get(payload, 'startTime', ''),
        endTime :_.get(payload, 'endTime', ''),
        userName: _.get(payload, 'userName', ''),
        description : _.get(payload, 'description', ''),
        availablity: _.get(payload, 'availablity', ''),
        profilePicture: ImageUrl,
        SalonsImage:newSalonsImage,
        bannerImage: newBannerImage
      }

      const salons = await Salons.findByIdAndUpdate({
        _id: payload._id
      }, updateSalons )


      const updateUser = {
        profile: {
          firstName: _.get(payload, 'profile.firstName', ''),
          lastName: _.get(payload, 'profile.lastName', ''),
          mobile: payload.profile.mobile.replace(/[^\d]/g, ''),
          email: _.get(payload, 'profile.email', '')
        },
        userName: _.get(payload, 'userName', ''),
        pricePoints: _.get(payload, 'pricePoints', ''),
        hairstyleServices: _.get(payload, 'hairstyleServices', []),
        hairType: _.get(payload, 'hairType', []),
        image: ImageUrl
      }

      const user = await Users.findOneAndUpdate({
        salonId: payload._id
      }, updateUser )

      return reply({
        status: true,
        message: 'Salons info updated successfully.',
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
  path: '/EditSalons',
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