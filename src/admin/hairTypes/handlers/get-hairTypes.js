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

const HairTypes = require('../../../models/hairTypes')
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
  const limit = 24

  let skip = 0
  page > 1 ? (skip = (page - 1) * limit) : page

  const totalLength = await HairTypes.find({}).count()
  const totalPage = totalLength/limit
  const data = await HairTypes.aggregate([{
                      "$match" : {
                        "$or": [{
                              "title": {
                                "$regex": text
                              }}, 
                              {"subtitle": {
                                "$regex": text  
                              }}, 
                              {"description": {
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
    reply({success:true, HairTypes: data, totalPage, totalLength})
  })
  .catch((err) => {
    reply({ success:false, HairTypes: [], message: err.message })
  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getHairTypes',
  config: {
    auth: 'jwt',
    tags: ['api', 'HairTypes'],
    description: 'Returns a list of HairTypes.',
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
