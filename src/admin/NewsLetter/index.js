// import postnewLetterEmail from './handlers/post-newLetterEmail'
// import getnewLetterEmail from './handlers/get-newLetterEmail'

const postnewLetterEmail = require('./handlers/post-newLetterEmail')
const getnewLetterEmail = require('./handlers/get-newLetterEmail')

exports.register = (server, options, next) => {
  postnewLetterEmail(server, options)
  getnewLetterEmail(server, options)
  next()
}

exports.register.attributes = {
  name: 'NewsLetter'
}