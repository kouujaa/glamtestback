const postmakeupArtist = require('./handlers/post-makeupArtist')
const getmakeupArtist = require('./handlers/get-makeupArtist')
const putMakeupArtist = require('./handlers/put-makeupArtist')
const deletemakeupArtist = require('./handlers/delete-makeupArtist')

exports.register = (server, options, next) => {
    postmakeupArtist(server, options)
    getmakeupArtist(server, options)
    putMakeupArtist(server, options)
    deletemakeupArtist(server, options)
  next()
}

exports.register.attributes = {
  name: 'makeupArtist'
}
