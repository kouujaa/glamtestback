/**
 * Users
 *
 * url: /users
 */

// import Helpers from '../helpers'


// import getAllUser from './handlers/get-allUser'
// import getUser from './handlers/get-user'
// import getUsers from './handlers/get-users'
// import postUser from './handlers/post-user'
// import getSignupData from './handlers/get-signupdata'
// import updatePassword from './handlers/update-password'
// import updateUserBlocked from './handlers/update-userBlocked'
// import ResetPasswordLink from './handlers/Reset-Password-Link'
// import UpdatePasswordByLink from './handlers/Update-Password-By-Link'
// import putUser from './handlers/put-user'

const Helpers = require('../helpers')
const getAllUser = require('./handlers/get-allUser')
const getUser = require('./handlers/get-user')
const getUsers = require('./handlers/get-users')
const postUser = require('./handlers/post-user')
const getSignupData = require('./handlers/get-signupdata')
const updatePassword = require('./handlers/update-password')
const updateUserBlocked = require('./handlers/update-userBlocked')
const ResetPasswordLink = require('./handlers/Reset-Password-Link')
const UpdatePasswordByLink = require('./handlers/Update-Password-By-Link')
const putUser = require('./handlers/put-user')



exports.register = (server, options, next) => {

  Helpers.applyPrettyValidation(server)

  // setup our routes
  getUser(server, options)
  getUsers(server, options)
  postUser(server, options)
  getAllUser(server, options)
  getSignupData(server, options)
  putUser(server, options)
  updatePassword(server, options)
  updateUserBlocked(server, options)
  ResetPasswordLink(server, options)
  UpdatePasswordByLink(server, options)
  next()
}

exports.register.attributes = {
  name: 'users'
}
