/**
 * Module imports
 *
 **/

// import Boom from 'boom'
// import Hoek from 'hoek'

const Boom = require('boom')
const Hoek = require('hoek')

/**
 * Project imports
 *
 **/

// import Joi from '../../../validation'
// import NewsLetter from '../../../models/NewsLetter'
// import helpers from '../../../helpers'

const Joi = require('../../../validation')
const NewsLetter = require('../../../models/NewsLetter')
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

const handler = async(request, reply) => {
  console.log(request,'requestrequestrequest')
  const data = request.payload
  console.log(data,'adasd')
  try {
    const newsLetterData = await new NewsLetter(data)
    await newsLetterData.save()
    return reply({
      status: true,
      message: 'created successfully'
    })
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
  path: '/submitEmailAddress',
  config: {
    tags: ['api', 'submitEmailAddress'],
    description: 'submit Email Address',
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
''