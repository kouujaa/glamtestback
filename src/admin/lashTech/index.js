const postLashTech = require('./handlers/post-lashTech')
const getLashTech = require('./handlers/get-lashTech')
const putLashTech = require('./handlers/put-lashTech')
const deleteLashTech = require('./handlers/delete-lashTech')

exports.register = (server, options, next) => {
    postLashTech(server, options),
    getLashTech(server, options),
    putLashTech(server, options),
    deleteLashTech(server, options),
    next()
}

exports.register.attributes = {
    name: 'lashTech'
}