/**
  * Module imports
  *
 **/

// import Hoek from 'hoek'
// import { get } from 'lodash'
const get = require('lodash/get')
const Hoek = require('hoek')
/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import hairStylist from '../../../models/hairStylist'
const hairStylist = require('../../../models/hairStylist')
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
  
  const totalLength = await hairStylist.find({}).count()
  const totalPage = totalLength/limit
  const data = await hairStylist.aggregate([{
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
                      },{ 
                        $sort : { title : 1 } 
                      }
    ])
    .then((data) => {
      reply({success:true, hairStylist: data, totalPage , totalLength})
    })
    .catch((err) => {
      reply({ success:false, hairStylist: [], message: err.message })
    })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getHairStylist',
  config: {
    auth: 'jwt',
    tags: ['api', 'hairStylist'],
    description: 'Returns a list of hairStylist.',
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
