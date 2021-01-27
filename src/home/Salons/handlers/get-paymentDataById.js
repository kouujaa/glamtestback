const get = require('lodash/get')
const Hoek = require('hoek')

const helpers = require('../../../helpers')
const SubscriptionPayment = require('../../../models/subscriptionPayment')
const Boom = require('boom')


let defaults = {}

const handler = async(request, reply) => {
  const salonsId = helpers.extractUserId(request)

  if(!salonsId){
    return reply(Boom.unauthorized('Not authorized'))
  }

  return SubscriptionPayment.findOne({userId: salonsId})
    .then(data => {
      if(data!==''){
        reply({
          status:true, 
          paymentData: data
        })
      }
    })
    .catch(error => 
      reply({ 
        status:false, 
        paymentData: [], 
        message: error.message 
      })  
    )
}

const routeConfig = {
    method: 'GET',
    path: '/getPaymentData',
  config: {
    auth: 'jwt',
    tags: ['api', 'Salons'],
    description: 'Returns a list of Salons.',
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