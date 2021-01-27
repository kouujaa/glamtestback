const postLandingPageEmail = require('./handlers/post-landingPageEmail')

exports.register = (server, options, next) => {
    postLandingPageEmail(server, options)
    next()
}

exports.register.attributes = {
    name: 'LandingPageEmail'
}