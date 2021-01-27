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
// import Salons from '../../../models/salons'
const helpers = require('../../../helpers')
const Salons = require('../../../models/salons')


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
  const hairstyle = get(request.query, 'hairStyles', '')
  const hairtype = get(request.query, 'hairTypes', '')
  const makeupArtist = get(request.query, 'makeupArtist', '')
  const nailTechs = get(request.query, 'nailTechs', '')
  const lashTech = get(request.query, 'lashTechs', '')
  const pricePoint = get(request.query, 'pricePoints', '')
  const ratings = parseInt(get(request.query, 'ratings', 0))
  const page = parseInt(get(request.query, 'page', 0))
  const limit = 6

  let skip = 0
  page > 1 ? (skip = (page - 1) * limit) : page
  const totalLength = await Salons.find({ "isActive" : true }).count()
  const totalPage = totalLength/limit
  if(hairstyle.length > 0 || hairtype.length > 0 || lashTech.length > 0 || ratings > 0){
    const data = await Salons.aggregate([{
      "$match" : {
        "$or" : [
                  { "hairstyleServices": {
                      "$eq": hairstyle,
                  }}, 
                  { "hairType": {
                      "$eq": hairtype,
                  }},
                  {
                    "makeupArtist": {
                      "$eq": makeupArtist
                  }},
                  {
                    "nailTechs": {
                      "$eq": nailTechs
                  }},
                  {
                    "lashTech": {
                      "$eq": lashTech
                  }},
                  { "NewRating": {
                    "$eq": ratings
                  } 
                }
               ],
            "$and" :[{ "isActive" : true }]
          }}, {
            "$skip" : skip
          }, {
            "$limit" : parseInt(limit)
          }
        ])
    .then((data) => {
    reply({status :true, Salons: data , totalPage , totalLength })
    })
    .catch((err) => {
    reply({ status :false, Salons: [], message: err.message })
    })
  }else if(hairstyle.length === 0 || hairtype.length === 0 || lashTech.length === 0 || ratings === 0){
    const data = await Salons.aggregate([{
      "$match" : {
        "$or" : [
                  { "hairstyleServices": {
                      "$regex": hairstyle,
                      //"$options": "i"
                  }}, 
                  { "hairType": {
                      "$regex": hairtype,
                      //"$options": "i"
                  }},
                  {
                    "makeupArtist": {
                      "$regex": makeupArtist
                  }},
                  {
                    "nailTechs": {
                      "$regex": nailTechs
                  }},
                  {
                    "lashTech": {
                      "$regex": lashTech
                    }
                  },
                  { "NewRating": ratings }
               ],
            "$and" :[{ "isActive" : true }]
          }}, {
            "$skip" : skip
          }, {
            "$limit" : parseInt(limit)
          }
        ])
    .then((data) => {
    reply({status :true, Salons: data , totalPage , totalLength })
    })
    .catch((err) => {
    reply({ status :false, Salons: [], message: err.message })
    })
  }
  
}

/**
  * Route config
  *
 **/

const routeConfig = {
  method: 'GET',
  path: '/getSalonsData',
  config: {
    tags: ['api', 'Salons'],
    description: 'Returns a list of Salons.',
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
