const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const LandingPageEmailSchema = new Schema(
    {
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

module.exports = Mongoose.model('landingpageemail', LandingPageEmailSchema)