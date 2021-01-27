/**
 * Module imports
 *
 **/
// import _ from 'lodash'
// import Boom from 'boom'
// import Hoek from 'hoek'
// import Mongoose from 'mongoose'

const _ = require('lodash')
const Boom = require('boom')
const Hoek = require('hoek')
const Mongoose = require('mongoose')

/**
 * Project imports
 *
 **/

// import Joi from '../../../validation'
// import helpers from '../../../helpers'
// import EmailService from '../../../services/email'
// import MailDetails from '../../../models/mailDetails'
// import NewsLetter from '../../../models/NewsLetter'
// import ContactInfo from '../../../models/contact'

const Joi = require('../../../validation')
const helpers = require('../../../helpers')
const EmailService = require('../../../services/email')
const MailDetails = require('../../../models/mailDetails')
const NewsLetter = require('../../../models/NewsLetter')
const ContactInfo = require('../../../models/contact')

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
  const body = request.payload
  const data = {
    email: _.get(body,'email',''),
    subject: _.get(body,'subject',''),
    details: _.get(body,'details',''),
    role: _.get(body,'role',''),
  }
  try {
    if(body && _.get(body,'role','') === 'NEWS_LETTER'){
      const newsLetterDetails = await NewsLetter.findOne({ _id: request.payload.id })

      const saveMailData = await new MailDetails(data)
      await saveMailData.save()
      let totalMail = newsLetterDetails.count
      let updateData = {
        email : _.get(body,'email',''),
        count : totalMail + 1 
      }

      const updateMailDetails = await NewsLetter.findByIdAndUpdate({
          _id: request.payload.id
      }, updateData, {
          new:true,
          runValidatiors : true
      })
    } 
    if(body && _.get(body,'role','') === 'CONTACT_INFO'){
      const ContactInfoDetails = await ContactInfo.findOne({ _id: request.payload.id })

      const saveMailData = await new MailDetails(data)
      await saveMailData.save()
      let totalMail = ContactInfoDetails.count
      let updateData = {
        name : _.get(body,'name',''),
        email : _.get(body,'email',''),
        message : _.get(body,'message',''),
        count : totalMail + 1 
      }

      const updateMailDetails = await ContactInfo.findByIdAndUpdate({
          _id: request.payload.id
      }, updateData, {
          new:true,
          runValidatiors : true
      })
    }
    EmailService.sendMail(body, function (err, data) {
      if(err === true){
        return reply({ status: true, message: 'send Mail successfully' })
      } else{
        return reply({ status: false, message: err.message, data: {} })
      }
    })
  } catch (err) {
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
  path: '/sendMail',
  config: {
    auth: 'jwt',
    tags: ['api', 'sendMail'],
    description: 'sendMail',
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