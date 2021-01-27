/**
  * Module imports
  *
 **/

const get = require('lodash/get')
const Hoek = require('hoek')
/**
  * Project imports
  *
 **/

const helpers = require('../../../helpers')
const HairTypes = require('../../../models/hairTypes')
const HairStyles = require('../../../models/hairStylist')
const MakeupArtist = require('../../../models/makeupArtist')
const NailTech = require('../../../models/nailTech')
const LashTech = require('../../../models/lashTech')



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
    if(request.query.service === 'Hair'){
        try {
            const ht = await HairTypes.find({})
            const hs = await HairStyles.find({})
            return reply({
              status :true, 
              hair: [...ht,...hs],
            })
        } catch (error) {
            return reply({
              status :false, 
              hair: [],
              message: err.message
            })
        }
    }else if(request.query.service === 'Lashes'){
        try {
            const data = await LashTech.find({})
            return reply({
              status :true, 
              lashTech: data,
            })
        } catch (error) {
            return reply({
              status :false, 
              lashTech: [],
              message: err.message
            })
        }
    }else if(request.query.service === 'MakeUp'){
        try {
            const data = await MakeupArtist.find({})
            return reply({
              status :true, 
              makeupArtist: data,
            })
        } catch (error) {
            return reply({
              status :false, 
              makeupArtist: [],
              message: err.message
            })
        }
    }else if(request.query.service === 'Nails'){
        try {
            const data = await NailTech.find({})
            return reply({
              status :true, 
              nailTech: data,
            })
        } catch (error) {
            return reply({
              status :false, 
              nailTech: [],
              message: err.message
            })
        }
    }
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getServiceStyles',
  config: {
    tags: ['api', 'serviceStyle'],
    description: 'Returns a list of best serviceStyle.',
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
