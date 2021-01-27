//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const schema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    subject: {
      type: String,
      default: ''
    },
    details: {
      type: String,
      default: ''
    },
    role: { 
      type: Array, 
      default: [] 
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

const MailDetails = 'MailDetails'
module.exports = Mongoose.model(MailDetails, schema)