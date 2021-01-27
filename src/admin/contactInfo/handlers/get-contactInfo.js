/**
  * Module imports
  *
 **/

// import { get } from 'lodash'
// import Hoek from 'hoek'

const get = require('lodash/get')
const Hoek = require('hoek')

/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import contactInfo from '../../../models/contact'
const helpers = require('../../../helpers')
const contactInfo = require('../../../models/contact')


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
  const text = get(request.query, 'text', '')
  const page = parseInt(get(request.query, 'page', 0))
  const limit = 10

  let skip = 0
  page > 1 ? (skip = (page - 1) * limit) : page
  const totalLength = await contactInfo.find({}).count()
  const totalPage = totalLength/limit
  const data = await contactInfo.aggregate([{
                      "$match" : {
                        "$or": [{
                              "name": {
                                "$regex": text
                              }}, 
                              {"email": {
                                "$regex": text  
                              }}
                              ]
                            }}, {
                                "$skip" : skip
                            }, {
                                "$limit" : parseInt(limit)
                            }
    ])
  .then((data) => {
    reply({status:true, ContactInfo: data, totalPage ,totalLength })
  })
  .catch((err) => {
    reply({ status:false, ContactInfo: [], message: err.message })
  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getContactInfo',
  config: {
  	auth: 'jwt',
    tags: ['api', 'Contact Info'],
    description: 'Returns a list of Contact Info.',
    notes: [],
   validate: {
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}
