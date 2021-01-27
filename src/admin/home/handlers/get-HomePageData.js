/**
  * Module imports
  *
 **/

// import { get } from 'lodash'
// import Hoek from 'hoek'

const get = require('lodash/get')
const Hoek = require('hoek')

/**
  * Project imports
  *
 **/

// import helpers from '../../../helpers'
// import HairStylist from '../../../models/hairStylist'
// import HairTypes from '../../../models/hairTypes'
// import Salons from '../../../models/salons'
// import Users from '../../../models/users'
// import NewsLetter from '../../../models/NewsLetter'
// import Contact from '../../../models/contact'

const helpers = require('../../../helpers')
const HairStylist = require('../../../models/hairStylist')
const HairTypes = require('../../../models/hairTypes')
const MakeupArtist = require('../../../models/makeupArtist')
const NailTech = require('../../../models/nailTech')
const LashTech = require('../../../models/lashTech')
const Salons = require('../../../models/salons')
const Users = require('../../../models/users')
const NewsLetter = require('../../../models/NewsLetter')
const Contact = require('../../../models/contact')
const ServiceBookings = require('../../../models/serviceBookings')

/**
  * Setup
  *
 **/

let defaults = {}

/**
  * Handler
  *
 **/

const handler = async (request, reply) => {
  try {
    const hairStylist = await HairStylist.find({}).count()
    const hairTypes = await HairTypes.find({}).count()
    const makeupArtist = await MakeupArtist.find({}).count()
    const nailTech = await NailTech.find({}).count()
    const lashTech = await LashTech.find({}).count()
    const salons = await Salons.find({}).count()
    const newsLetter = await NewsLetter.find({}).count()
    const contact = await Contact.find({}).count()
    const orders = await ServiceBookings.find({}).count()
    const users = await Users.find({ "role" : "USER" }).count()

    return reply({
      status:true,
      hairStylist,
      hairTypes,
      makeupArtist,
      nailTech,
      lashTech,
      salons,
      users,
      newsLetter,
      contact,
      orders
    })
  } catch (error){
    return reply({ 
      success:false,
      hairStylist: [],
      hairTypes: [],
      makeupArtist: [],
      nailTech: [],
      lashTech: [],
      salons: [],
      users: [],
      orders: [],
      message: error.message 
    })
  }
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getHomePageData',
  config: {
    auth: 'jwt',
    tags: ['api', 'getHomePageData'],
    description: 'Returns a list of Admin Home Page Data.',
    notes: [],
   validate: {
    },
    handler
  }
}

module.exports = (server, opts) => {
  defaults = Hoek.applyToDefaults(defaults, opts)
  server.route(routeConfig)
}