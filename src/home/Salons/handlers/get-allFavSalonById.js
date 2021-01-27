const get = require('lodash/get')
const Hoek = require('hoek')
const Boom = require('boom')

const helpers = require('../../../helpers')
const Salons = require('../../../models/salons')
const Users = require('../../../models/users')
const FavoriteSalon = require('../../../models/favoriteSalon')
const { ObjectId } = require('mongodb')

let defaults = {}

const handler = async(request, reply) => {
    try{
        const userId = helpers.extractUserId(request)
        if(!userId){
            return reply(Boom.unauthorized('Not authorized'))
        }
        const text = get(request.query, 'text', '')
        const page = parseInt(get(request.query, 'page', 0))
        const limit = 10

        let skip = 0
        page > 1 ? (skip = (page - 1) * limit ) : page
        const totalLength = await FavoriteSalon.find({ userId: userId }).count()
        const totalPage = totalLength/limit

        const data = await FavoriteSalon.aggregate([{
            "$match": {
                "$or": [{
                    "salonName": {
                        "$regex": text
                    }},
                ],
            }},
            {
                "$match": {userId: ObjectId(userId)}
            },
            {
                "$skip": skip
            },
            {
                "$limit": parseInt(limit)
            },
        ])
        .then(data => {
            reply({status:true, FavSalon: data, totalPage ,totalLength })
        })
        .catch((err) => {
            reply({ status: false, FavSalon: [], message:err.message })
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
    path: '/getAllFavSalonById',
    config: {
        auth: 'jwt',
        tags: ['api', 'Orders'],
        description: 'Returns a list of Orders.',
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
