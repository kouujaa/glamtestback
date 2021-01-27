const Mongoose  = require('mongoose')

const Schema = Mongoose.Schema
const SubscriptionPaymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        last4: {
            type: Number,
            default: ''
        },
        exp_month: {
            type: Number,
            default: ''
        },
        exp_year: {
            type: Number,
            default: ''
        },
        amount: {
            type: Number,
            default: ''
        },
        validity: {
            type: Number,
            default: ''
        },
        customer_id: {
            type: String,
            default: ''
        },
        description: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
)

module.exports = Mongoose.model('SubscriptionPayment', SubscriptionPaymentSchema)