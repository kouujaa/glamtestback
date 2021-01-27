const getOrders = require('./handlers/get-allOrders')

exports.register = (server, options, next) => {
    getOrders(server, options)
    next()
}

exports.register.attributes = {
    name: 'orders'
}