// import getBestHairStylist from './handlers/get-hairstyles'
// import getTopHairStylist from './handlers/get-topHairStyles'
// import getSalonsbyHairStyles from './handlers/get-salonsbyHairStyles'

const getBestHairStylist = require('./handlers/get-hairstyles')
const getTopHairStylist = require('./handlers/get-topHairStyles')
const getSalonsbyHairStyles = require('./handlers/get-salonsbyHairStyles')

exports.register = (server, options, next) => {
  getBestHairStylist(server, options)
  getTopHairStylist(server, options)
  getSalonsbyHairStyles(server, options)
  next()
}

exports.register.attributes = {
  name: 'BestHairStylist'
}