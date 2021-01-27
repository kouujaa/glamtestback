const getBestMakeupArtist = require('./handlers/get-makeupArtist')

exports.register = (server, options, next) => {
    getBestMakeupArtist(server, options)
  next()
}

exports.register.attributes = {
  name: 'BestMakeupArtist'
}