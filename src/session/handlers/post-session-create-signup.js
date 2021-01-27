/**
 * Module imports
 *
 **/
// import Boom from 'boom'
// import Hoek from 'hoek'
// import _ from 'lodash'
// import { get } from 'lodash'

const _ = require('lodash')
const Boom = require('boom')
const Hoek = require('hoek')
const get = require('lodash/get')

/**
 * Project imports
 *
 **/
// import { uploadImage } from '../../services/aws'
// import Joi from '../../validation'
// import Users from '../../models/users'
// import Salons from '../../models/salons'
// import Helpers from '../../helpers'
const Helpers = require('../../helpers')
const Users = require('../../models/users')
const uploadImage = require('../../services/aws')
const Joi = require('../../validation')
const Salons = require('../../models/salons')


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
    const email = _.get(request, 'payload.profile.email', '')
    const mobile = payload.profile.mobile.replace(/[^\d]/g, '')
    const username = _.get(payload, 'userName', '')

    const user = await Users.findOne({
      'profile.email': email
    })

    const userPhoneNumber = await Users.findOne({
      'profile.mobile': mobile
    })

    const uniquename = await Users.findOne({
      'userName': username
    })
    let ImageUrl
    
    if((payload.image).length > 0){
      const url  = await uploadImage(payload.image[0])
      ImageUrl = get(url, "data", "")
    } else {
      ImageUrl = [{ Location : '/images/profile.png' }]
    }

    if(ImageUrl){
      if (!user && !uniquename && !userPhoneNumber && _.get(payload, 'role', '') === 'USER') {
        const data = {
          profile: {
            firstName: _.get(payload, 'profile.firstName', ''),
            lastName: _.get(payload, 'profile.lastName', ''),
            mobile: payload.profile.mobile.replace(/[^\d]/g, ''),
            email
          },
          password: _.get(payload, 'password', ''),
          userName: _.get(payload, 'userName', ''),
          role: _.get(payload, 'role', ''),
          preferredHairStyle: _.get(payload, 'preferredHairStyle', []),
          preferredHairType: _.get(payload, 'hairType', []),
          preferredlashTech: _.get(payload, 'lashTech', []),
          image: ImageUrl
        }
        const newUser = await new Users(data)
        const userData = await newUser.save()
        return reply({
          status: true,
          token: Helpers.createJwt(userData),
          userData
        })
      }
      if (!user && !uniquename && !userPhoneNumber && _.get(payload, 'role', '') === 'ADMIN') {
        const data = {
          profile: {
            firstName: _.get(payload, 'profile.firstName', ''),
            lastName: _.get(payload, 'profile.lastName', ''),
            mobile: payload.profile.mobile.replace(/[^\d]/g, ''),
            email
          },
          password: _.get(payload, 'password', ''),
          userName: _.get(payload, 'userName', ''),
          role: _.get(payload, 'role', ''),
          image: ImageUrl
        }
        const newAdmin = await new Users(data)
        const adminData = await newAdmin.save()
        return reply({
          status: true,
          token: Helpers.createJwt(adminData),
          adminData
        })
      }
      if (!user && !uniquename && !userPhoneNumber && _.get(payload, 'role', '') === 'STYLIST') {
        const data = {
          profile: {
            firstName: _.get(payload, 'profile.firstName', ''),
            lastName: _.get(payload, 'profile.lastName', ''),
            mobile: payload.profile.mobile.replace(/[^\d]/g, ''),
            email
          },
          password: _.get(payload, 'password', ''),
          userName: _.get(payload, 'userName', ''),
          role: _.get(payload, 'role', ''),
          pricePoints: _.get(payload, 'pricePoints', ''),
          hairstyleServices: _.get(payload, 'hairstyleServices', []),
          makeupArtist: _.get(payload, 'makeupArtist', []),
          nailTech: _.get(payload, 'nailTech', []),
          //hairType: _.get(payload, 'hairType', []),
          lashTech: _.get(payload, 'lashTech', []),
          image: ImageUrl,
          freeLancer : _.get(payload, 'freeLancer', '')
        }
        const newUser = await new Users(data)
        const userData = await newUser.save()
        
        const salon = _.get(payload, 'salon', {})
        salon.userId = _.get(userData, '_id','')
        salon.pricePoints = _.get(payload, 'pricePoints', ''),
        salon.hairstyleServices = _.get(payload, 'hairstyleServices', []),
        salon.makeupArtist= _.get(payload, 'makeupArtist', []),
        salon.nailTech= _.get(payload, 'nailTech', []),
        //salon.hairType = _.get(payload, 'hairType', []),
        salon.lashTech = _.get(payload, 'lashTech', []),
        salon.startTime = _.get(payload, 'startTime', ''),
        salon.endTime = _.get(payload, 'endTime', ''),
        salon.firstName = _.get(payload, 'profile.firstName', ''),
        salon.lastName = _.get(payload, 'profile.lastName', ''),
        salon.mobile = payload.profile.mobile.replace(/[^\d]/g, ''),
        salon.email = email,
        salon.userName = _.get(payload, 'userName', ''),
        salon.freeLancer = _.get(payload, 'freeLancer', ''),
        salon.profilePicture = ImageUrl

        const newSalon = await new Salons(salon)
        const salonData = await newSalon.save()
        await Users.findOneAndUpdate(
          {
            _id: userData._id
          },
          {
            $push: {
              salonId: salonData._id
            }
          }
        )
        return reply({
          status: true,
          token: Helpers.createJwt(userData),
          data: {}
        })
      } if(user) {
        return reply({
          status: false,
          message: 'mail already exists.',
          data: {}
        })
      } if (userPhoneNumber){
        return reply({
          status: false,
          message: 'Phone Number already exists.',
          data: {}
        })
      } if(uniquename){
        return reply({
          status: false,
          message: 'userName is already exists.',
          data: {}
        })
      }
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
  path: '/session/signup',
  config: {
    tags: ['api', 'session'],
    description: 'User Signup',
    notes: [],
    // validate: {
    //   payload: {
    //     image: Joi.array().optional(),
    //     profilePicture: Joi.array().optional(),
    //     profile: Joi.object().required(),
    //     userName: Joi.string().optional(),
    //     role: Joi.string().required(),
    //     salon: Joi.object().optional(),
    //     password: Joi.string().required(),
    //     pricePoints: Joi.string().optional(),
    //     hairstyleServices: Joi.array().optional(),
    //     hairType: Joi.array().optional(),
    //     lashTech: Joi.array().optional(),
    //     preferredHairStyle: Joi.array().optional(),
    //     preferredHairType: Joi.array().optional(),
    //     startTime: Joi.string().optional(),
    //     endTime: Joi.string().optional(),
    //     firstName: Joi.string().optional(),
    //     lastName: Joi.string().optional(),
    //     mobile: Joi.string().optional(),
    //     email: Joi.string().optional(),
    //     freeLancer: Joi.string().optional()
    //   }
    // },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
