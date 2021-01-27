/**
 * System imports
 *
 **/

//import crypto from 'crypto'
const crypto = require('crypto')

/**
 * Module imports
 *
 **/

// import _ from 'lodash'
// import bcryptSync from 'bcrypt-nodejs'
// import Bluebird from 'bluebird'
//import Mongoose from 'mongoose'
const _ = require('lodash')
const bcryptSync = require('bcrypt-nodejs')
const Bluebird = require('bluebird')
const Mongoose = require('mongoose')

/**
 * Project imports
 *
 **/

// import Constants from '../constants'
// import Config from '../config'
// import Joi from '../validation'

const Constants = require('../constants')
const Config = require('../config')
const Joi = require('../validation')

/**
 * Setup
 *
 **/
const TLD = Config.get('/general').tld
const bcrypt = Bluebird.promisifyAll(bcryptSync)

/**
 * Model
 *
 **/

const validateEmail = email => {
  return Joi.validate(email, Joi.string().email())
}

// const validatePostalCode = (code) => {
//   return Joi.validate(code, Joi.string().length(Constants.POSTAL_CODE_LENGTH))
// }
const Schema = Mongoose.Schema
const schema = new Mongoose.Schema(
  {
    env: { type: String, default: process.env.NODE_ENV },
    role: { type: Array, default: ['USER'] },
    salonId: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Salons'
      }
    ],
    profile: {
      firstName: { type: String, default: '' },
      lastName: { type: String, default: '' },
      mobile: {
        type: String,
        unique: false,
        index: true,
        sparse: true,
        trim: true
      },
      landmark: { type: String, default: '' },
      street: { type: String, default: '' },
      city: { type: String, default: '' },
      state: { type: String, default: '' },
      pincode: { type: String, default: '' },
      email: {
        type: String,
        unique: true,
        index: true,
        sparse: true,
        lowercase: true,
        trim: true,
        validate: [validateEmail, 'Please provide a valid email address']
      }
    },
    preferredHairStyle:{
      type : Array,
      default:[]
    },
    preferredHairType:{
      type : Array,
      default:[]
    },
    preferredlashTech:{
      type : Array,
      default:[]
    },
    userName: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      trim: true
    },
    image:{
      type: Array,
      default: '/images/profile.png'
    },
    freeLancer:{
      type: String,
      default: ''
    },
    password: { type: String },
    // other user info
    activity: {
      dateEstablished: { type: Date, default: Date.now },
      lastLogin: { type: Date, default: Date.now },
      lastUpdated: { type: Date },
      loginCount: { type: Number, default: 0 }
    },
    createdBy: { type: Mongoose.Schema.ObjectId, ref: 'Users' },
    isActive: { type: Boolean, default: true },
    isSuperAdmin: { type: Boolean, default: false },
    status: {
      type: Number,
      default: Constants.USER.STATES.ACTIVE,
      enum: _.values(Constants.USER.STATES)
    },
    deviceType: { type: String },
    deviceToken: { type: String }
  },
  { timestamps: true }
)

// schema.pre('save', function (next) {
//   this.env = process.env.NODE_ENV
//   this.roles = _.union(_.get(this, 'roles', []), [Constants.USER.ROLES.GALLERY])
//   if (!this.isModified('email') || this.email) {
//     delete this.email
//   }
//   if (!this.isModified('password') || !this.password) {
//     return next()
//   } else {
//     const SALT_FACTOR = 5
//     return bcrypt.genSaltAsync(SALT_FACTOR)
//       .then((salt) => {
//         return bcrypt.hashAsync(this.password, salt, null)
//       })
//       .then((hash) => {
//         this.password = hash
//         next()
//       })
//       .catch((err) => next(err))
//   }
// })
schema.pre('save', function(next) {
  this.env = process.env.NODE_ENV
  // this.email = this.email.toLowerCase()
  if (!this.isModified('password')) {
    return next()
  } else {
    const SALT_FACTOR = 5
    return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => {
        return bcrypt.hashAsync(this.password, salt, null)
      })
      .then(hash => {
        this.password = hash
        next()
      })
      .catch(err => next(err))
  }
})

/*schema.pre('insertMany', function(next) {
  this.env = process.env.NODE_ENV
  this.email = this.email.toLowerCase()
  if (!this.isModified('password')) {
    return next()
  } else {
    const SALT_FACTOR = 5
    return bcrypt.genSaltAsync(SALT_FACTOR)
      .then((salt) => {
        return bcrypt.hashAsync(this.password, salt, null)
      })
      .then((hash) => {
        this.password = hash
        next()
      })
      .catch((err) => next(err))
  }
})*/

// schema.post('save', importData)
// schema.post('findOneAndUpdate', importData)
schema.pre('findOneAndUpdate', function(next) {
  const password = _.get(this._update, '$set.password', false)
  if (password) {
    const SALT_FACTOR = 5
    return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then(salt => {
        return bcrypt.hashAsync(password, salt, null)
      })
      .then(hash => {
        this._update.password = hash
        return next()
      })
      .catch(err => next(err))
  } else {
    return next()
  }
})

schema.methods.toJSON = function() {
  const obj = this.toObject()
  delete obj.password
  return obj
}

// schema.methods.comparePassword = function (candidatePassword, cb) {
//   bcrypt.compareAsync(candidatePassword, this.password)
//     .then((isMatch) => {
//       cb(null, isMatch)
//     })
//     .catch((err) => {
//       cb(err)
//     })
// }
schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt
    .compareAsync(candidatePassword, this.password)
    .then(isMatch => cb(null, isMatch))
    .catch(err => cb(err))
}
// schema.methods.compareSms = function (candidateSMS) {
//   return candidateSMS === this.smsVerificationCode
// }

schema.methods.isTestUser = function() {
  if (!this.mobile) {
    return false
  }
  return _.includes(Constants.TEST_MOBILE_NUMBERS, this.mobile)
}

/* schema.methods.isAdmin = function () {
  const adminRoles = [Constants.USER.ROLES.SUPERADMIN, Constants.USER.ROLES.ADMIN]
  return !!_.intersection(
    adminRoles,
    this.roles
  ).length
}

schema.methods.isSuperAdmin = function () {
  return _.includes(this.roles, Constants.USER.ROLES.SUPERADMIN)
}
 */
schema.methods.setLastLogin = function() {
  this.activity.lastLogin = Date.now()
}

schema.methods.addDeviceToken = function(device) {
  this.devices.push(device)
  // check if the device is already there
  this.devices = _.uniqBy(this.devices, device => {
    return `${device.type}${device.token}`
  })
}

/* schema.statics.getAdminScopes = () => {
  return [
    Constants.USER.ROLES.ADMIN,
    Constants.USER.ROLES.SUPERADMIN
  ]
}

schema.statics.getNonAdminScopes = () => {
  return [
    Constants.USER.ROLES.MYAPP,
    Constants.USER.ROLES.PARTNER
  ]
}

schema.statics.getOwnerScopes = () => {
  return [
    Constants.USER.ROLES.SUPERADMIN
  ]
}

schema.statics.getNonOwnerScopes = () => {
  return [
    Constants.USER.ROLES.MYAPP
  ]
}

schema.statics.getPartnerScopes = () => {
  return [
    Constants.USER.ROLES.PARTNER
  ]
} */

schema.statics.getScopes = () => {
  return _.values(Constants.USER.ROLES)
}

schema.statics.generateVerificationCode = () => {
  var text = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ$.abcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 61; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

schema.methods.gravatar = function(
  size = Constants.GRAVATAR_SIZE,
  defaults = 'retro'
) {
  const md5 = crypto.createHash('md5').update(this.email)
  return `https://gravatar.com/avatar/${md5
    .digest('hex')
    .toString()}?s=${size}&d=${defaults}`
}

/**
 *  Adding totalAvailableOffers
 */
/* schema.set('toJSON', {
  transform: (doc, ret) => {
    ret.totalAvailableOffers = 500.00

    if (_.isEmpty(ret.roles) && ret.type) {
      ret.roles = ret.type
      doc.roles = ret.type
      doc.save()
    }

    delete ret.MYAPP_amount
    return ret
  }
})
 */
module.exports = Mongoose.model('Users', schema)
