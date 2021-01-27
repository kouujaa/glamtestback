/**
 * Project imports
 */

// import _ from 'lodash'
// import Boom from 'boom'
// import Jwt from 'jsonwebtoken'
// import Hoek from 'hoek'

const _ = require('lodash')
const Boom = require('boom')
const Jwt = require('jsonwebtoken')
const Hoek = require('hoek')

/**
 * Module imports
 */
// import constants from './constants'
// import Config from './config'
// import Users from './models/users'

const constants = require('./constants')
const Config = require('./config')
const Users = require('./models/users')

/**
 * Setup
 */

// var serviceAccount = require(process.env.google_json);

// var registrationToken = "epZb7l_i6fk:APA91bG3Iujh4huSXygugqJLQgNVWj_ybyQjUHGME1v4ptxF-BMMNnL9PEbLbSLgdOvuExOoNmD4AUucmPTohWWcPxP-JVlRG8esHi2WqdxPvRK3HA9rcH0a_cqxKcVf33oLaaggpMD4"
// var registrationToken = "ermBuLRGoCY:APA91bFelmWRvoMl_mmXYEippsZUyWQiN8GBPk6Lzo80IgzgbUsp71rWabj0R5Eu3kiHc0-OYx69TE8W87teKoq2iQr9SID1iYTdFUC5_ONC9RT13-Faxn6RF4JA079iMkIovwOfllf3"

// var payload = {
//     notification: {
//         title: "Accountbxvc Deposit",
//         body: "A deposit tosdf your savings account has just cleared.",

//         mutable_content: "true"
//     },
//     data: {

//         imgurl: 'http://www.houzzcart.com/uploads/1548354514323.jpg'
//     }

// };
// var options = {
//     priority: "high",

//     timeToLive: 60 * 60
// };

// admin.messaging().sendToDevice(registrationToken, payload, options)
//     .then(function(response) {
//         console.log("Successfully sent message:", response);
//     })
//     .catch(function(error) {
//         console.log("Error sending message:", error);
//     });

const extractUserId = request => {
  return _.get(request, 'auth.credentials.id', false)
}

const extractUserScopes = request => {
  console.log('scope -----> ', _.get(request, 'auth'))
  return _.get(request, 'auth.credentials.scope', [])
}

const isAdmin = request => {
  return _.intersection(extractUserScopes(request)).length > 0
}

// const isOwner = (request) => {
//     return _.intersection(extractUserScopes(request), Users.getOwnerScopes()).length > 0
// }

// const isPartner = (request) => {
//     return _.intersection(extractUserScopes(request), Users.getPartnerScopes()).length > 0
// }

// const hasPermission = (request, userId) => {
//     return isAdmin(request) || String(extractUserId(request)) === String(userId)
// }

const extractManagedUserId = request => {
  // default to current logged in user if no managed user is found
  return _.get(
    request,
    'auth.credentials.managedUserId',
    extractUserId(request)
  )
}

// const extractUserQuery = (request, key = '_id') => {
//     const userId = extractUserId(request)
//     const query = {}
//     query[key] = userId

//     if (isAdmin(request)) {
//         const managedUserId = extractManagedUserId(request)
//         if (managedUserId) {
//             query[key] = { $in: [extractUserId(request), managedUserId] }
//         }
//     }
//     return query
// }

const isValidJson = str => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

const createAdminJwt = (admin, managedUser) => {
  const contents = {
    id: admin._id,
    scope: admin.roles,
    managedUserId: managedUser._id,
    mangaedScope: managedUser.roles,
    createdAt: Date.now()
  }

  const options = Hoek.applyToDefaults(
    {
      key: null,
      expires: '1m',
      verifyOptions: { algorithms: ['HS256'] }
    },
    Config.get('/auth')
  )

  const token = Jwt.sign(contents, options.key, {
    algorithm: options.verifyOptions.algorithms[0],
    expiresIn: options.expires
  })

  return token
}

const createJwt = user => {
  console.log(
    'createJwt ======================== ',
    _.get(user, 'role', 'USER')
  )
  const contents = {
    id: user._id,
    scope: [_.get(user, 'role', 'USER')],
    createdAt: Date.now()
  }

  const options = Hoek.applyToDefaults(
    {
      key: null,
      expires: '1m',
      verifyOptions: { algorithms: ['HS256'] }
    },
    Config.get('/auth')
  )

  const token = Jwt.sign(contents, options.key, {
    algorithm: options.verifyOptions.algorithms[0],
    expiresIn: options.expires
  })
  console.log('token ------->>> ', token)
  return token
}

const boomify = err => {
  const statusCode = Number(
    _.get(err, 'statusCode', _.get(err, 'raw.statusCode', constants.HTTP400))
  )
  const strErr = `${err}`
  const message = _.get(
    err,
    'message',
    _.get(
      err,
      'raw.message',
      _.get(err, 'error_message', strErr === '' ? 'Bad Request' : strErr)
    )
  )

  let boom = null
  if (_.get(err, 'isBoom', false)) {
    boom = err
  } else if (!_.isError(err)) {
    boom = Boom.create(statusCode, message, { timestamp: Date.now() })
  } else if (_.isError(err)) {
    boom = Boom.wrap(err, statusCode, message)
  } else {
    // err.isBoom
    boom = err
  }
  if (!_.get(boom, 'response', false)) {
    console.error('boomify error', boom) // eslint-disable-line no-console
  } else {
    console.error('boomify error', _.get(boom, 'output', '')) // eslint-disable-line no-console
  }
  return boom
}

const validationErrorHandler = (request, reply, source, error) => {
  //eslint-disable-line max-params
  const prettyOutput = error.data.details.reduce(
    (payload, errorInfo) => {
      payload.messages.push(errorInfo.message)
      payload.keysFormats.push(_.pick(errorInfo, ['path', 'type', 'context']))
      return payload
    },
    { messages: [], keysFormats: [] }
  )

  _.set(error, 'output.payload.message', prettyOutput.messages.join('\n'))
  _.set(error, 'output.payload.validation.keys', prettyOutput.keysFormats)

  reply(error)
}

const applyPrettyValidation = server => {
  const originalRouteMethod = server.route

  server.route = config => {
    if (_.has(config, 'config.validate')) {
      _.set(config, 'config.validate.failAction', validationErrorHandler)
    }
    originalRouteMethod.call(server, config)
  }
}

module.exports = {
  applyPrettyValidation,
  validationErrorHandler,
  boomify,
  createAdminJwt,
  createJwt,
  extractManagedUserId,
  extractUserId,
  // extractUserQuery,
  extractUserScopes,
  // hasPermission,
  isAdmin,
  // isOwner,
  // isPartner,
  isValidJson
}
