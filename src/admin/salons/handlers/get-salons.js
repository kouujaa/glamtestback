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
// import Salons from '../../../models/salons'
const Salons = require('../../../models/salons')
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

const handler = async (request, reply) => {
  const text = get(request.query, 'text', '')
  const page = parseInt(get(request.query, 'page', 0))
  const limit = 10

  let skip = 0
  page > 1 ? (skip = (page - 1) * limit) : page
  const totalLength = await Salons.find({}).count()
  const totalPage = totalLength/limit
  const data = await Salons.aggregate([{
                      "$match" : {
                        "$or": [{
                              "salonName": {
                                "$regex": text
                              }}, 
                              {"salonAddress": {
                                "$regex": text
                              }
                            }]
                      }}, {
                        $skip: skip
                      }, {
                        $limit: parseInt(limit)
                      }
    ])
  .then((data) => {
    reply({success:true, Salons: data, totalPage, totalLength })
  })
  .catch((err) => {
    reply({ success:false, Salons: [], message: err.message })
  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getSalons',
  config: {
    auth: 'jwt',
    tags: ['api', 'Salons'],
    description: 'Returns a list of Salons.',
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
