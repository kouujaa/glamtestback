//import getHomePageData from './handlers/get-HomePageData'
const getHomePageData = require('./handlers/get-HomePageData')
exports.register = (server, options, next) => {
  getHomePageData(server, options)
  next()
}

exports.register.attributes = {
  name: 'adminHome'
}
