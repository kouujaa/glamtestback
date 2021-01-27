//import contactUs from './handlers/post-contact-us'
const contactUs = require('./handlers/post-contact-us')

exports.register = (server, options, next) => {
  contactUs(server, options)
  next()
}

exports.register.attributes = {
  name: 'contact'
}
