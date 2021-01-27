//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const NewsLetterEmailSchema = new Schema(
  {
    email: {
      type:String,
      default:''
    },
    count:{
      type:Number,  
      default:0
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

module.exports = Mongoose.model('NewsLetterEmail', NewsLetterEmailSchema)
