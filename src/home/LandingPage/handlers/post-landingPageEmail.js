const Hoek = require('hoek')

//const LandingNotificationMail = require('../../../models/landingNotificationMail')
const NewsLetter = require('../../../models/NewsLetter')

let defaults = {}

const handler = async(request, reply) => {
    const data = request.payload
    try{
        const LandingPageData = NewsLetter(data)
        await LandingPageData.save()
        return reply({
            status: true,
            message: 'Email add successfully. We will contact you.'
        })
    }catch(error){
        return reply({
            status: false,
            message: error.message,
            data: {}
        })
    }
}

const routeConfig = {
    method: 'POST',
    path: '/addlandingpageemail',
    config: {
        tags: ['api', 'Add Mail'],
        description: 'Add Mail for Notification',
        notes: ['On success'],
        handler
    }

}

module.exports = (server, opts) => {
    defaults = Hoek.applyToDefaults(defaults, opts)
    server.route(routeConfig)
}