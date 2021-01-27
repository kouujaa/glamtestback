/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'

const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const get = require('lodash/get')
const map = require('lodash/map')

/**
 * Project imports
 *
 **/

// import Joi from '../../../validation'
// import NewRating from '../../../models/newRating'
// import Salons from '../../../models/salons'
// import Users from '../../../models/users'
// import helpers from '../../../helpers'

const Joi = require('../../../validation')
const NewRating = require('../../../models/newRating')
const Salons = require('../../../models/salons')
const Users = require('../../../models/users')
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
  const userId = helpers.extractUserId(request)
  const payload = request.payload
  try {
    const user = await Users.findOne({ _id: userId })
    console.log(payload.image)
    if(payload.image !== ''){
      // const ImageUrl = await Promise.all(
      //   map(get(payload, "image", []), async(val, i) => {
      //     const url  = await uploadImage(val)
      //       console.log(url,'url')
      //       return get(url, "data", "")
      //   })
      // )
      
    const ImageUrl = payload.image
    const data = {
      rating : payload.rating,
      review : payload.review,
      salonId : payload.salonId,
      userName : user.profile.firstName, 
      userImage : user.image,
      image: ImageUrl
    }

    const NewRatingData = await new NewRating(data)
    await NewRatingData.save()

    await Salons.findOneAndUpdate(
      {
        _id: payload.salonId
      },
      {
        $push: {
          newRatingId: NewRatingData._id
        }
      }
    )
    return reply({
      status: true,
      message: 'created successfully'
    })
  }else{
    let ImageData = ''
    const data = {
      rating : payload.rating,
      review : payload.review,
      salonId : payload.salonId,
      userName : user.profile.firstName, 
      userImage : user.image,
      image: ImageData
    }

    const NewRatingData = await new NewRating(data)
    await NewRatingData.save()

    await Salons.findOneAndUpdate(
      {
        _id: payload.salonId
      },
      {
        $push: {
          newRatingId: NewRatingData._id
        }
      }
    )
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
  path: '/addNewRating',
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

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
