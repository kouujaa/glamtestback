//import Mongoose from 'mongoose'
const Mongoose = require('mongoose')
const Schema = Mongoose.Schema
const NailTechSchema = new Schema({
    image: { 
      type: Array, 
      default: '/images/User_male.png'  
    },
    title: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
})

module.exports = Mongoose.model('NailTech', NailTechSchema)
