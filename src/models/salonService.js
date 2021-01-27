//import Mongoose from 'mongoose'
const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;
const SalonServiceSchema = new Schema(
  {
    serviceName: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    price: {
      type: String,
      default: ""
    },
    salonId: [
      {
        type: Schema.Types.ObjectId,
        ref: "salons"
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
);

module.exports = Mongoose.model("salonService", SalonServiceSchema);
