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

// import helpers from '../../helpers'
// import PricePoints from '../../models/pricePoints'
// import HairStylist from '../../models/hairStylist'
// import HairTypes from '../../models/hairTypes'

const helpers = require('../../helpers')
const PricePoints = require('../../models/pricePoints')
const HairStylist = require('../../models/hairStylist')
const HairTypes = require('../../models/hairTypes')
const LashTech = require('../../models/lashTech')
const MakeupArtist = require('../../models/makeupArtist')
const NailTech = require('../../models/nailTech')

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
    const pricePoints = await PricePoints.find({})
    const hairStylist = await HairStylist.find({})
    const hairTypes = await HairTypes.find({})
    const lashTech = await LashTech.find({})
    const makeupArtist = await MakeupArtist.find({})
    const nailTech = await NailTech.find({})

    return reply({
      success:true,
      pricePoints,
      hairStylist,
      hairTypes,
      lashTech,
      makeupArtist,
      nailTech
    })
  } catch (error){
    return reply({ 
      success:false,
      pricePoints: [],
      hairStylist: [],
      makeupArtist:[],
      nailTech:[],
      hairTypes: [],
      message: error.message })
  }
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getSignUpData',
  config: {
    tags: ['api', 'getSignUpData'],
    description: 'Returns a list of sign up data.',
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