// import pricePoints from './handlers/post-pricePoints'
// import getpricePoints from './handlers/get-pricePoints'

const pricePoints = require('./handlers/post-pricePoints')
const getpricePoints = require('./handlers/get-pricePoints')

exports.register = (server, options, next) => {
  pricePoints(server, options)
  getpricePoints(server, options)
  next()
}

exports.register.attributes = {
  name: 'pricePoints'
}