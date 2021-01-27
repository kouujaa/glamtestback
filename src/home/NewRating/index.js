// import postNewRating from './handlers/post-newRating'
// import updateSalonNewRating from './handlers/update-salonNewRating'

const postNewRating = require('./handlers/post-newRating')
const updateSalonNewRating = require('./handlers/update-salonNewRating')

exports.register = (server, options, next) => {
  postNewRating(server, options)
  updateSalonNewRating(server, options)
  next()
}

exports.register.attributes = {
  name: 'NewRating'
}