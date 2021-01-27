const get = require('lodash/get')
const Hoek = require('hoek')
const Boom = require('boom')

const helpers = require('../../../helpers')
const ServiceBookings = require('../../../models/serviceBookings')
const Salons = require('../../../models/salons')

let defaults = {}

const handler = async(request, reply) => {
    const salonsId = helpers.extractUserId(request)
    if(!salonsId){
        return reply(Boom.unauthorized('Not authorized'))
      }
    const text = get(request.query, 'text', '')
    const page = parseInt(get(request.query, 'page', 0))
    const limit = 10

    let skip = 0
    page > 1 ? (skip = (page - 1) * limit ) : page
    const totalLength = await ServiceBookings.find({ salon_user: salonsId }).count()
    const totalPage = totalLength/limit

    const salonData = await Salons.findOne({ userId: salonsId })
    
    const data = await ServiceBookings.aggregate([{
        "$match": {
            "$or": [{
                "salonName": {
                    "$regex": text
                }},
                {
                    "email": {
                        "$regex": text
                }}
            ],
        }},
        {
            "$match": {salon_user: salonsId}
        },
        {
            "$skip": skip
        },
        {
            "$limit": parseInt(limit)
        },
    ])
    .then(data => {
        reply({status:true, Orders: data, salonData: salonData , totalPage ,totalLength })
    })
    .catch((err) => {
        reply({ status: false, Orders: [], message:err.message })
    })
    
}

const routeConfig = {
    method: 'GET',
    path: '/getSalonOrders',
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
