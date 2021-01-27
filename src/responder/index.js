/**
  * Responder
  *
  * Standardize our responses
  *
 **/

/**
  * Module imports
  *
 **/
//import _ from 'lodash'
const _ = require('lodash')

/**
  * Project imports
  *
 **/

//import constants from '../constants'
const constants = require('../constants')


/**
  * Plugin
  *
 **/

const massagePayload = (payload) => {
  // setup an empty response when our route handler provides null
  if (payload === null) {
    payload = []
  }

  if (!_.isArray(payload)) {
    payload = [payload]
  }

  return payload
}

const getResponseCode = (request, payload) => {
  let responseCode = constants.HTTP200
  if (request.method === 'post') responseCode = constants.HTTP201

  if (!payload.length && request.method !== 'get') responseCode = constants.HTTP204

  return responseCode
}

const responder = (request, reply) => {
  // continue without modification if it's an error or docs
  //const skip = new RegExp('documentation|swagger|download|twilio|apple-app-site-association|webhooks/empyr').test(request.path)
 
  const skip = true
  if (request.response.isBoom || skip) {
    return reply.continue()
  }

  const payload = massagePayload(request.response.source)
  const responseCode = getResponseCode(request, payload)

  return reply({
    message: 'ok',
    data: payload
  }).code(responseCode)
}

exports.register = (server, options, next) => {
  server.ext('onPreResponse', responder)
  next()
}

exports.register.attributes = {
  name: 'responder'
}
