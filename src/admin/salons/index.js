// import getsalons from './handlers/get-salons'
// import deletesalons from './handlers/delete-salons'
// import editsalons from './handlers/put-salons'
// import updateSalonBlocked from './handlers/update-salonBlocked'
// import putSalonsImages from './handlers/put-salonsImages'

const getsalons = require('./handlers/get-salons')
const deletesalons = require('./handlers/delete-salons')
const editsalons = require('./handlers/put-salons')
const updateSalonBlocked = require('./handlers/update-salonBlocked')
const putSalonsImages = require('./handlers/put-salonsImages')

exports.register = (server, options, next) => {
  getsalons(server, options)
  deletesalons(server, options)
  editsalons(server, options)
  updateSalonBlocked(server, options)
  putSalonsImages(server, options)
  next()
}

exports.register.attributes = {
  name: 'salons'
}
