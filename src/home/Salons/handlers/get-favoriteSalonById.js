const Boom = require('boom')
const Hoek = require('hoek')
const get = require('lodash/get')

const helpers = require('../../../helpers')
const FavoriteSalon = require('../../../models/favoriteSalon')

let defaults = {}

const handler = async(request, reply) => {
    try{
        const userId = helpers.extractUserId(request)

        const salon_id = get(request.query, 'id', '')

        const data = await FavoriteSalon.find({
            $and: [
                {salonId : salon_id},
                {userId: userId}
              ]
        })
        return reply({
            status:true, 
            favsalon: data
        })

    }catch(error){
        return reply({ 
            status:false, 
            favsalon: [], 
            message: error.message 
        })
    }
}

const routeConfig = {
    method: 'GET',
    path: '/getFavoriteSalonsById',
    config: {
        auth: 'jwt',
        tags: ['api', 'Salons'],
        description: 'Returns a list of Favorite Salons.',
        notes: [],
       validate: {
        },
        handler
      }
}

module.exports = (server, opts) => {
    defaults = Hoek.applyToDefaults(defaults, opts)
    server.route(routeConfig)
}