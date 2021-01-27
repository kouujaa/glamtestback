/**
  * Module imports
  *
 **/

// import _ from 'lodash'
// import Hoek from 'hoek'
const _ = require('lodash')
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

const handler = (request, reply) => {
  const userId = helpers.extractUserId(request)
  console.log(userId,'userId')
  

  if (!userId) {
    return reply(Boom.unauthorized('Not authorized!'))
  }

  // const scope = helpers.extractUserScopes(request)
  // const isAdmin = !!_.intersection(User.getAdminScopes(), scope).length

  return Users.findOne({ _id: userId })
  .then((data) => {

    reply({status:true, users: data})

  })
  .catch((err) => {

    reply({ status:false, users: [], message: err.message })

  })
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getUser',
  config: {
    auth: 'jwt',
    tags: ['api', 'users'],
    description: 'Returns a list of users.',
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
