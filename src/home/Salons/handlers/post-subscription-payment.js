const Boom = require('boom')
const Hoek = require('hoek')
const stripe = require('stripe')("sk_test_51HFG7nH08RyXN5rBhFHWUfyJ3DoboKDg676HVFHxOj1Wvh0SH6KkBJN4yc6xgyj97DKHgU4BXBa2gEro39KTUoGq00bhykwcJM")
const Mongoose = require('mongoose')

const helpers = require('../../../helpers')
const SubscriptionPayment = require('../../../models/subscriptionPayment')
const Salons = require('../../../models/salons')

let defaults = {}

const handler = async(request, reply) => {
    const userId = helpers.extractUserId(request)
    payload = request.payload

    try{
        const oldUser = await SubscriptionPayment.findOne({ userId : userId })
        if(oldUser){
            return stripe.customers.create({
                email: payload.token.email,
                source: payload.token.id,
                name: payload.token.card.name
            })
            .then(customer => {
                stripe.charges.create({
                    amount: payload.product.price,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: payload.token.email,
                    description: payload.product.name,
                    shipping: {
                        name: payload.token.card.name,
                        address: {
                            line1: '***', 
                            country: payload.token.card.country
                        }
                    },
                })
                .then(async(result) => {
                    const PaymentData = {
                        userId: userId,
                        last4: payload.token.card.last4,
                        exp_month: payload.token.card.exp_month,
                        exp_year: payload.token.card.exp_year,
                        amount: result.amount,
                        validity: (parseInt(payload.product.validity) + parseInt(payload.leftDays)) ,
                        customer_id: result.customer,
                        description: result.description,
                        email: result.receipt_email,
                    }
                    const SubscriptionPaymentDetail = await SubscriptionPayment.findOneAndUpdate({
                        _id: new Mongoose.Types.ObjectId(oldUser._id)
                      }, PaymentData,{
                        new:true,
                        runValidatiors : true
                    })
                    const updateSalons = {
                        isActive : true
                      }
                    const SalonDetail = await Salons.findOneAndUpdate({
                        userId: new Mongoose.Types.ObjectId(userId)
                      }, updateSalons,{
                        new:true,
                        runValidatiors : true
                      })
                    reply({
                        result: result,
                        message: 'Payment Update Successfull'
                    })
                })
            })
            .catch(err => console.log(err))   
        }else{
            return stripe.customers.create({
                email: payload.token.email,
                source: payload.token.id,
                name: payload.token.card.name
            })
            .then(customer => {
                stripe.charges.create({
                    amount: payload.product.price,
                    currency: 'usd',
                    customer: customer.id,
                    receipt_email: payload.token.email,
                    description: payload.product.name,
                    shipping: {
                        name: payload.token.card.name,
                        address: {
                            line1: '***', 
                            country: payload.token.card.country
                        }
                    },
                })
                .then(async(result) => {
                    const PaymentData = {
                        userId: userId,
                        last4: payload.token.card.last4,
                        exp_month: payload.token.card.exp_month,
                        exp_year: payload.token.card.exp_year,
                        amount: result.amount,
                        validity: payload.product.validity,
                        customer_id: result.customer,
                        description: result.description,
                        email: result.receipt_email,
                    }
                    const SubscriptionPaymentData = SubscriptionPayment(PaymentData)
                    await SubscriptionPaymentData.save()
                    const updateSalons = {
                        isActive : true
                      }
                    const SalonDetail = await Salons.findOneAndUpdate({
                        userId: new Mongoose.Types.ObjectId(userId)
                      }, updateSalons,{
                        new:true,
                        runValidatiors : true
                      })
                    reply({
                        result: result,
                        message: 'Payment Successfull'
                    })
                })
            })
            .catch(err => console.log(err))   
        }
    }catch(err){
        return reply({
            status: false,
            message: error.message,
            data: {}
        })
    }
}


const routeConfig = {
    method: 'POST',
    path: '/addSubscriptionPayment',
    config: {
        auth: 'jwt',
        tags: ['api', 'Add Payment'],
        description: 'Add Subscription Payment',
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