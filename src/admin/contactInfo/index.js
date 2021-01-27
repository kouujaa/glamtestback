//import getContactInfo from './handlers/get-contactInfo'

const getContactInfo = require('./handlers/get-contactInfo')

exports.register = (server, options, next) => {
  getContactInfo(server, options)
  next()
}

exports.register.attributes = {
  name: 'ConatctInfo'
}