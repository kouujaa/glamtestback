/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'
// import bcrypt from 'bcrypt'
// import _ from 'lodash'
const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const bcrypt = require('bcrypt')
/**
 * Project imports
 *
 **/

// import Joi from '../../validation'
// import Users from '../../models/users'
// import helpers from '../../helpers'
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
  const payload = request.payload
  console.log(payload,'payload')
  try {
  	const user = await Users.findOne({ _id : payload.id })

    const updateUser = {
      password: await bcrypt.hash(payload.password,10),
    }

    const changePassword = await Users.findOneAndUpdate({
      _id: user._id
    }, updateUser )

    return reply({
      status: true,
      message: 'Password changed successfully.',
      data: changePassword
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
  path: '/UpdatePasswordByLink',
  config: {
    tags: ['api', 'Update Password'],
    description: 'To Update Password details',
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
