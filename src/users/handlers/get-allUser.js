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

// import helpers from '../../helpers'
// import Users from '../../models/users'

const helpers = require('../../helpers')
const Users = require('../../models/users')


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
  const totalLength = await Users.find({ "role" : "USER" }).count()
  const totalPage = totalLength/limit
  const data = await Users.aggregate([{
                      "$match" : {
                        "$or": [{ "profile.firstName": {
                                    "$regex": new RegExp(text),
                                    '$options': 'i'
                                } }, 
                                { "profile.lastName": {
                                    "$regex": new RegExp(text),
                                    '$options': 'i'
                                } }
                                ],
                       "$and": [ {"role" : {$in: ["USER"]}} ] 
                     }},
                      {
                        "$skip" : skip
                      }, {
                        "$limit" : parseInt(10)
                      }
    ])
  .then((data) => {
    reply({success:true, Users: data, totalPage, totalLength })
  })
  .catch((err) => {
    reply({ success:false, Users: [], message: err.message })
  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getAllUsers',
  config: {
    tags: ['api', 'Users'],
    description: 'Returns a list of Users.',
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