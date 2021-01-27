// import postratings from './handlers/post-ratings'
// import updateSalonsRating from './handlers/update-salonsRating'

const postratings = require('./handlers/post-ratings')
const updateSalonsRating = require('./handlers/update-salonsRating')

exports.register = (server, options, next) => {
  postratings(server, options)
  updateSalonsRating(server, options)
  next()
}

exports.register.attributes = {
  name: 'ratings'
}