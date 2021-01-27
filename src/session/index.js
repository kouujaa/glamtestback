/**
 * Session
 *
 * Sets up a "session" for a user
 *
 * url: /settings
 */

/**
 * Project imports
 *
 **/

// import Helpers from '../helpers'

// import postSession from './handlers/post-session'
// import checkUser from './handlers/check-user'
// import postSessionSignup from './handlers/post-session-update-signup'
// import postCreateUser from './handlers/post-session-create-signup'

const Helpers = require('../helpers')
const postSession = require('./handlers/post-session')
const checkUser = require('./handlers/check-user')
const postSessionSignup = require('./handlers/post-session-update-signup')
const postCreateUser = require('./handlers/post-session-create-signup')

exports.register = (server, options, next) => {
  Helpers.applyPrettyValidation(server)

  postSession(server, options)
  postSessionSignup(server, options)
  checkUser(server, options)
  postCreateUser(server, options)
  next()
}

exports.register.attributes = {
  name: 'session'
}
