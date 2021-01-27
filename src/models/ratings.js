//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')

const Schema = Mongoose.Schema
const RatingSchema = new Schema(
  {
    rating: {
      type:Number,
      default:0
    },
    salonName: {
      type: String,
      default: ''
    },
    salonsId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'salons'
      }
    ],
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

module.exports = Mongoose.model('Rating', RatingSchema)

