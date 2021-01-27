//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const NewRatingSchema = new Schema(
  {
    image: { 
      type: Array, 
      default: ''  
    },
    rating: {
      type:Number,
      default:0
    },
    review: {
      type: String,
      default: ''
    },
    userName: {
      type: String,
      default: ''
    },
    userImage:{
      type: Array,
      default :''
    },
    salonId: [
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

module.exports = Mongoose.model('NewRating', NewRatingSchema)

