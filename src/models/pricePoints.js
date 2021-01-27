//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const PricePointSchema = new Schema({
    price: {
      type:String,
      default:''
    }
})

module.exports = Mongoose.model('PricePoints', PricePointSchema)
