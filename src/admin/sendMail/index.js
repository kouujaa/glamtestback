//import sendMail from './handlers/post-sendMail'
const sendMail = require('./handlers/post-sendMail')
exports.register = (server, options, next) => {
  sendMail(server, options)
  next()
}

exports.register.attributes = {
  name: 'sendMail'
}