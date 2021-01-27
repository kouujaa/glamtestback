/**
  * Module imports
  *
 **/

const get = require('lodash/get')
const Hoek = require('hoek')
/**
  * Project imports
  *
 **/

const makeupArtist = require('../../../models/makeupArtist')
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
  
  const totalLength = await makeupArtist.find({}).count()
  const totalPage = totalLength/limit
  const data = await makeupArtist.aggregate([{
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
      reply({success:true, makeupArtist: data, totalPage , totalLength})
    })
    .catch((err) => {
      reply({ success:false, makeupArtist: [], message: err.message })
    })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getMakeupArtist',
  config: {
    auth: 'jwt',
    tags: ['api', 'makeupArtist'],
    description: 'Returns a list of makeupArtist.',
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
