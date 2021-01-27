const getBestNailTech = require('./handlers/get-nailTechs')

exports.register = (server, options, next) => {
    getBestNailTech(server, options)
  next()
}

exports.register.attributes = {
  name: 'BestNailTech'
}