const Boom = require('boom')
const Hoek = require('hoek')
const Mongoose = require('mongoose')

const helpers = require('../../../helpers')
const Salons = require('../../../models/salons')

let defaults = {}
const handler = async(request, reply) => {
    const userId = helpers.extractUserId(request)
    //const payload = request.payload
    try{
        const updateSalons = {
            isActive : false
          }
        const SalonDetail = await Salons.findOneAndUpdate({
            userId: new Mongoose.Types.ObjectId(userId)
          }, updateSalons,{
            new:true,
            runValidatiors : true
          })
          return reply({
            status: true,
            message: 'Salon info updated successfully.',
            data: SalonDetail
          })
    }catch(error){
        return {
            status: false,
            message: error.message,
            data: {}
        }
    }
}

const routeConfig = {
    method: 'PUT',
    path: '/disableSalon',
    config: {
        auth: 'jwt',
        tags: ['api', 'Disable Salon'],
        description: 'Disable Salon',
        notes: ['On success'],
        validate: {
        },
        handler
      }
}

module.exports = (server, opts) => {
    defaults = Hoek.applyToDefaults(defaults, opts)
    server.route(routeConfig)
}