const Mongoose = require('mongoose')

const Schema = Mongoose.Schema
const ServiceBookingSchema = new Schema(
    {
        bookingDate: {
            type: String,
            default: ''
        },
        bookingName: {
            type: String,
            default: ''
        },
        bookingMobile: {
            type: Number,
            default: ''
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        serviceId:
            {
                type: Array,
                default: ''
            },
        salonsId: [
            {
              type: Schema.Types.ObjectId,
              ref: 'salons'
            }
        ],
        salon_user: {
            type: String,
            default: ''
        },
        salonName: {
            type: String,
            default: ''
        },
        totalPrice: {
            type: Number,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
        status: {
            type: Boolean,
            default: false
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

module.exports = Mongoose.model('Servicebooking', ServiceBookingSchema)