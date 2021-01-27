// import _ from 'lodash'
// import Hoek from 'hoek'
// import Joi from 'joi'

// import Contact from '../../models/contact'

const _ = require('lodash')
const Hoek = require('hoek')
const Joi = require('joi')

const Contact = require('../../models/contact')
const EmailService = require('../../services/email')
/*
 * Api to create new ContactUs
 **/
let defaults = {}

const handler = async (request, reply) => {
  const data = request.payload
  console.log(data, 'requesttt')
  try {
    let body = {}
    body.toUser = data.email,
    body.message = data.message
    EmailService.sendConfirmation(body, function(err, data){ })
    const contact = await new Contact(data)
    await contact.save()
    return reply({
      status: true,
      message: 'Submited successfully'
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
  method: 'POST',
  path: '/contact_us',
  config: {
    tags: ['api', 'Contact'],
    description: 'Create glamplug ContactUS.',
    notes: ['On success'],
    validate: {
      payload: {
        name: Joi.string()
          .required()
          .error(new Error('Name is required')),
        email: Joi.string()
          .required()
          .error(new Error('Email is required')),
        message: Joi.string()
          .required()
          .error(new Error('Message is required'))
      }
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
