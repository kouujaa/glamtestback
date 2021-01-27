// import getsalonsdata from './handlers/get-salons'
// import getdatasalonsById from './handlers/get-salonsById'
// import getSalonsDetailsByID from './handlers/get-salonsDetailsByID'

const getsalonsdata = require('./handlers/get-salons')
const getdatasalonsById = require('./handlers/get-salonsById')
const getSalonsDetailsByID = require('./handlers/get-salonsDetailsByID')
const getPaymentDataById = require('./handlers/get-paymentDataById')
const postSubscriptionPayment = require('./handlers/post-subscription-payment')
const getSalonsOrdersById = require('./handlers/get-salonsOrderById')
const postFavoriteSalon = require('./handlers/post-favoriteSalon')
const getFavoriteSalonById = require('./handlers/get-favoriteSalonById')
const getAllFavSalonById = require('./handlers/get-allFavSalonById')
const deleteFavoriteSalon = require('./handlers/delete-favoriteSalon')
const updateDisableSalon = require('./handlers/update-disableSalon')
const getServiceStyles = require('./handlers/get-serviceStyles')

exports.register = (server, options, next) => {
  getsalonsdata(server, options)
  getdatasalonsById(server, options)
  getSalonsDetailsByID(server, options)
  getPaymentDataById(server, options)
  postSubscriptionPayment(server, options)
  getSalonsOrdersById(server, options)
  postFavoriteSalon(server, options)
  getFavoriteSalonById(server, options)
  getAllFavSalonById(server, options)
  deleteFavoriteSalon(server, options)
  updateDisableSalon(server, options)
  getServiceStyles(server, options)
  next()
}

exports.register.attributes = {
  name: 'salonsData'
}