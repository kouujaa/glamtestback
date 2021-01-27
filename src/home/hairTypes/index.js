// import getBestHairTypes from './handlers/get-hairTypes'
// import getSalonsbyHairTypes from './handlers/get-salonsbyHairTypes'

const getBestHairTypes = require('./handlers/get-hairTypes')
const getSalonsbyHairTypes = require('./handlers/get-salonsbyHairTypes')

exports.register = (server, options, next) => {
  getBestHairTypes(server, options)
  getSalonsbyHairTypes(server, options)
  next()
}

exports.register.attributes = {
  name: 'BestHairTypes'
}