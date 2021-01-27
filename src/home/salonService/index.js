// import postSalonService from './handlers/post-salonService'
// import putSalonService from './handlers/put-salonService'
// import deleteSalonService from './handlers/delete-salonService'

const postSalonService = require('./handlers/post-salonService')
const putSalonService = require('./handlers/put-salonService')
const deleteSalonService = require('./handlers/delete-salonService')

exports.register = (server, options, next) => {
  postSalonService(server, options)
  putSalonService(server, options)
  deleteSalonService(server, options)
  next()
}

exports.register.attributes = {
  name: 'salonService'
}
