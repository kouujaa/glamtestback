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
// import NewsLetter from '../../../models/NewsLetter'
const helpers = require('../../../helpers')
const NewsLetter = require('../../../models/NewsLetter')


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
  const totalLength = await NewsLetter.find({}).count()
  const totalPage = totalLength/limit
  const data = await NewsLetter.aggregate([{
                      "$match" : {
                        "$or": [{ "email": {
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
    reply({status:true, NewsLetter: data, totalPage, totalLength })
  })
  .catch((err) => {
    reply({ status:false, NewsLetter: [], message: err.message })
  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getNewsLetterEmail',
  config: {
    tags: ['api', 'NewsLetter'],
    description: 'Returns a list of NewsLetter.',
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
