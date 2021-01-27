const postServiceBooking = require('./handlers/post-service-booking')
const updateOrderStatus = require('./handlers/update-orderstatus')

exports.register = (server, options, next) => {
    postServiceBooking(server, options)
    updateOrderStatus(server, options)
    next()
}

exports.register.attributes = {
    name: 'service booking'
}