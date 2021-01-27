//import getCustomersLoveUs from './handlers/get-customersLoveUs'
const getCustomersLoveUs = require('./handlers/get-customersLoveUs')

exports.register = (server, options, next) => {
  getCustomersLoveUs(server, options)
  next()
}

exports.register.attributes = {
  name: 'CustomersLoveUs'
}