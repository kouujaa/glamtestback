const _ = require('lodash')
const Hoek = require('hoek')
const Boom = require('boom')

const helpers = require('../../../helpers')
const ServiceBooking = require('../../../models/serviceBookings')
const Salons = require('../../../models/salons')

let defaults = {}

const handler = async(request, reply) => {
    try{
        const payload = request.payload
        let total
        const salonData = await Salons.findOne({ _id : payload.salonId })
        if(payload.status === true){
            total = salonData.totalRevenue + payload.price
        }
        if(payload.status === false){
            total = salonData.totalRevenue - payload.price
        }
        const status = {
            status : payload.status
        }
        const data = await ServiceBooking.findOneAndUpdate({
            _id: payload._id
        }, status )

        const newStatus = {
            totalRevenue:  total
        }
        const newData = await Salons.findOneAndUpdate({
            _id: payload.salonId
        }, newStatus)
        
        return reply({
            status: true,
            message: 'Order status updated successfully.',
            data: data,
            salons: newData
        })
    }catch(error) {
        return reply({
            status: false,
            message: error.message,
            data: {}
          })
    }
}

const routeConfig = {
    method: 'PUT',
    path: '/UpdateOrderStatus',
    config: {
        auth: 'jwt',
        tags: ['api', 'Order'],
        description: 'To update Order details',
        notes: ['On success, returns { "data": [ { "Order" } ]}'],
        handler
      }
}

module.exports = (server, opts) => {
    defaults = Hoek.applyToDefaults(defaults, opts)
    server.route(routeConfig)
}