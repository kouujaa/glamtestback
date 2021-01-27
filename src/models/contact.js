//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')

const Schema = Mongoose.Schema
const schema = new Schema(
  {
    name: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    message: {
      type: String
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

const contactUs = 'contactUs'
module.exports = Mongoose.model(contactUs, schema)
