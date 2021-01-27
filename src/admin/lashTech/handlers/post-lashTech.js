const Boom = require('boom')
const Hoek = require('hoek')
const _ = require('lodash')
const get = require('lodash/get')
const map = require('lodash/map')

const Joi = require('../../../validation')
const lashTech = require('../../../models/lashTech')
const helpers = require('../../../helpers')
const uploadImage = require('../../../services/aws')

let defaults = {}

const handler = async(request, reply) => {
    try{
        const payload = request.payload 

        if((payload.image).length > 0){
            // const ImageUrl = await Promise.all(
            //     map(get(payload, "image", []), async (val,i)=>{
            //         const url  = await uploadImage(val)
            //         console.log(url,'url')
            //         return get(url, "data", "")
            //     })
            // )
            const ImageUrl = payload.image
            const data = {
                title: _.get(payload, 'title', ''),
                subtitle: _.get(payload, 'subtitle', ''),
                description: _.get(payload, 'description', ''),
                image: ImageUrl
            }
            const lashTechData = await new lashTech(data)
            await lashTechData.save()
            return reply({
                status: true,
                message: 'created successfully'
            })
        }
        else{
            let ImageData = [{ Location : '/images/User_male.png' }]
            const data = {
                title: _.get(payload, 'title', ''),
                subtitle: _.get(payload, 'subtitle', ''),
                description: _.get(payload, 'description', ''),
                image: ImageData
            }
            const lashTechData = await new lashTech(data)
            await lashTechData.save()
            return reply({
                status: true,
                message: 'created successfully'
            })
        }
    }catch(error){
        return {
            status: false,
            message: error.message,
            data: {}
          }
    }
}

const routeConfig = {
    method: 'POST',
    path: '/lashTech',
    config: {
        auth: 'jwt',
        tags: ['api', 'lashTech'],
        description: 'Create lashTech',
        notes: ['On success'],
        validate: {
          payload: {
            image: Joi.any()
              .optional(),
            title: Joi.string()
              .required()
              .error(new Error('title is required')),
            subtitle: Joi.string()
              .required()
              .error(new Error('subtitle is required')),
            description: Joi.string()
              .required()
              .error(new Error('description is required')),
          }
        },
        handler
      }
}

module.exports = (server, opts) => {
    defaults = Hoek.applyToDefaults(defaults, opts)
    server.route(routeConfig)
}
  