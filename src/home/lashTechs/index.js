const getLashTech = require('./handlers/get-lashTech')

exports.register = (server, options, next) => {
    getLashTech(server, options)
    next()
}

exports.register.attributes = {
    name: 'LashTech'
}