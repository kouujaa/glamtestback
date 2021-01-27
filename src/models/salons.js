//import Mongoose from 'mongoose'
//import Joi from '../validation'
const Mongoose = require("mongoose");
const Joi = require("../validation");

const Schema = Mongoose.Schema;
const validateEmail = email => {
  return Joi.validate(email, Joi.string().email());
};
const schema = new Schema(
  {
    salonName: {
      type: String,
      default: ""
    },
    userId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    ],
    ratingId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating"
      }
    ],
    newRatingId: [
      {
        type: Schema.Types.ObjectId,
        ref: "NewRating"
      }
    ],
    rating: {
      type: Number,
      default: 0
    },
    NewRating: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: ""
    },
    firstName: {
      type: String,
      default: ""
    },
    lastName: {
      type: String,
      default: ""
    },
    availablity: {
      type: Object,
      default: ""
    },
    mobile: {
      type: String,
      unique: false,
      index: true,
      sparse: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      lowercase: true,
      trim: true,
      validate: [validateEmail, "Please provide a valid email address"]
    },
    userName: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      trim: true
    },
    salonAddress: {
      type: String,
      default: ""
    },
    startTime: {
      type: String,
      default: ""
    },
    endTime: {
      type: String,
      default: ""
    },
    instagramName: {
      type: String,
      default: ""
    },
    facebookName: {
      type: String,
      default: ""
    },
    website: {
      type: String,
      trim: true,
      default: ""
    },
    hairstyleServices: {
      type: Array,
      default: []
    },
    hairType: {
      type: Array,
      default: []
    },
    lashTech: {
      type: Array,
      default: []
    },
    makeupArtist: {
      type: Array,
      default: []
    },
    nailTech: {
      type: Array,
      default: []
    },
    pricePoints: {
      type: Array,
      default: ""
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    profilePicture: {
      type: Array,
      default: "/images/profile.png"
    },

    SalonsImage: {
      type: Array,
      default: [{ Location: "/images/Hairtype.png", Etag: "demo" }]
    },
    bannerImage: {
      type: Array,
      default: [{ Location: "/images/salon.jpg", Etag: "demo" }]
    },
    freeLancer: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: false
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    salonServiceId: [
      {
        type: Schema.Types.ObjectId,
        ref: "salonService"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Salons = "Salons";
module.exports = Mongoose.model(Salons, schema);
