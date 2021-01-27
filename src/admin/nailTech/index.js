const postnailTech = require('./handlers/post-nailTech')
const getnailTech = require('./handlers/get-nailTech')
const putnailTech = require('./handlers/put-nailTech')
const deletenailTech = require('./handlers/delete-nailTech')

exports.register = (server, options, next) => {
    postnailTech(server, options)
    getnailTech(server, options)
    putnailTech(server, options)
    deletenailTech(server, options)
  next()
}

exports.register.attributes = {
  name: 'nailTech'
}
