// import postHairStylist from './handlers/post-hairStylist'
// import getHairStylist from './handlers/get-hairStylist'
// import deleteHairStylist from './handlers/delete-hairStylist'
// import editHairStylist from './handlers/put-hairStylist'

const postHairStylist = require('./handlers/post-hairStylist')
const getHairStylist = require('./handlers/get-hairStylist')
const deleteHairStylist = require('./handlers/delete-hairStylist')
const editHairStylist = require('./handlers/put-hairStylist')

exports.register = (server, options, next) => {
  postHairStylist(server, options)
  getHairStylist(server, options)
  deleteHairStylist(server, options)
  editHairStylist(server, options)
  next()
}

exports.register.attributes = {
  name: 'hairStylist'
}
