const get = require('lodash/get')
const Hoek = require('hoek')

const helpers = require('../../../helpers')
const ServiceBookings = require('../../../models/serviceBookings')

let defaults = {}

const handler = async(request, reply) => {
    const text = get(request.query, 'text', '')
    const page = parseInt(get(request.query, 'page', 0))
    const limit = 10

    let skip = 0
    page > 1 ? (skip = (page - 1) * limit ) : page
    const totalLength = await ServiceBookings.find({}).count()
    const totalPage = totalLength/limit
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
            ]
        }},
        {
            "$skip": skip
        },
        {
            "$limit": parseInt(limit)
        }
    ])
    .then((data) => {
        reply({status:true, Orders: data, totalPage ,totalLength })
    })
    .catch((err) => {
        reply({ status: false, Orders: [], message:err.message })
    })
}

const routeConfig = {
    method: 'GET',
    path: '/getAllOrders',
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