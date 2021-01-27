/**
 * Module imports
 *
 **/
// import { unset } from 'lodash'
// import Boom from '@hapi/boom'
// import Hoek from 'hoek'
// import Joi from 'joi'
// import bcrypt from 'bcrypt'
// import _ from 'lodash'

const _ = require('lodash')
const Boom = require('boom')
const Hoek = require('hoek')
const Joi = require('joi')
const unset = require('lodash/unset')
const bcrypt = require('bcrypt')

/**
 * Project imports
 *
 **/
// import Helpers from '../../helpers'
// import Users from '../../models/users'
const Helpers = require('../../helpers')
const Users = require('../../models/users')

/**
 * Setup
 *
 **/

let defaults = {}

/**
 * Handler
 *
 **/

const comparePassword = (user, password) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, async (err, match) => {
      console.log({ err, match })
      if (!match) {
        return reject('Invalid username and password combination')
      } else {
        // unset(user, 'password)
        return resolve(true)
      }
    })
  })
}
const handler = async (request, reply) => {
  try {
    const payload = request.payload
    console.log(payload, 'payload==========>>>>>.')
    const user = await Users.findOne({
      $or: [
        {
          'profile.email': _.get(payload, 'email', '')
        },
        {
          userName: _.get(payload, 'email', '')
        },
        {
          mobile: _.get(payload, 'ema il', '')
        }
      ]
    })
    if (user) {
      // if (user.isActive === true || user.status === 0) {
      //   return reply(Boom.forbidden('Your account is deactivated!'))
      // }
      // await comparePassword(user, payload.password)
      const valid =  await bcrypt.compareSync(payload.password, user.password)

      if(valid === true){
        return reply({ status: true, token: Helpers.createJwt(user), user })
      } else{
        return reply({ status: false, message: 'Login Credentials Invalid', data: {} })
      }
    } else {
      return reply({ status: false, message: 'Login Credentials Invalid', data: {} })
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
  path: '/session',
  config: {
    tags: ['api', 'session'],
    description: 'Starts a session based on valid email and password.',
    notes: ['On success, returns a token and user object'],
    validate: {
      payload: {
        userName: Joi.string().optional(),
        email: Joi.string().optional(),
        password: Joi.string().required()
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
