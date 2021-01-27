// import posthairTypes from './handlers/post-hairTypes'
// import getHairTypes from './handlers/get-hairTypes'
// import deleteHairTypes from './handlers/delete-hairTypes'
// import editHairTypes from './handlers/put-hairTypes'

const posthairTypes = require('./handlers/post-hairTypes')
const getHairTypes = require('./handlers/get-hairTypes')
const deleteHairTypes = require('./handlers/delete-hairTypes')
const editHairTypes = require('./handlers/put-hairTypes')

exports.register = (server, options, next) => {
  posthairTypes(server, options)
  getHairTypes(server, options)
  deleteHairTypes(server, options)
  editHairTypes(server, options)
  next()
}

exports.register.attributes = {
  name: 'hairTypes'
}
