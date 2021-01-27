const get = require('lodash/get')
const Hoek = require('hoek')

const lashTech = require('../../../models/lashTech')
const helpers = require('../../../helpers')

let defaults = {}

const handler = async (request, reply) => {
  const text = get(request.query, 'text', '')
  const page = parseInt(get(request.query, 'page', 0))
  const limit = 24
  
  let skip = 0
  page > 1 ? (skip = (page - 1) * limit) : page
  
  const totalLength = await lashTech.find({}).count()
  const totalPage = totalLength/limit
  const data = await lashTech.aggregate([{
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
      reply({success:true, lashTech: data, totalPage , totalLength})
    })
    .catch((err) => {
      reply({ success:false, lashTech: [], message: err.message })
    })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getLashTech',
  config: {
    auth: 'jwt',
    tags: ['api', 'lashTech'],
    description: 'Returns a list of lashTech.',
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
