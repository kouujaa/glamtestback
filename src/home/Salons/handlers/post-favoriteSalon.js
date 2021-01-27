const Boom = require('boom')
const Hoek = require('hoek')

const helpers = require('../../../helpers')
const FavoriteSalon = require('../../../models/favoriteSalon')

let defaults = {}

const handler = async(request, reply) => {
    const userId = helpers.extractUserId(request)
    const payload = request.payload
    try{
        const data = {
            userId: userId,
            salonId: payload.salonId,
            salonName: payload.salonName
        }
        if(payload.favorite==='favorite'){
            const FavoriteSalonData = FavoriteSalon(data)
            await FavoriteSalonData.save()
            return reply({
                status: true,
                message: 'Add Salon as Favorite successfully'
            })
        }
        else if(payload.favorite==='unfavorite'){
            await FavoriteSalon.deleteOne({
                $and: [
                    {salonId : payload.salonId},
                    {userId: userId}
                  ]
              })
              return reply({
                status: true,
                message: 'Remove Salon as Favorite successfully'
            })
        }

        // await Salons.findByIdAndUpdate(
        //     {
        //         _id: payload.salonId
        //     },
        //     {
        //         $push: {
        //             favoriteUserId: userId
        //         }
        //     }
        // )
        // await Users.findByIdAndUpdate(
        //     {
        //         _id: userId
        //     },
        //     {
        //         $push: {
        //             favoriteSalon: payload.salonId
        //         }
        //     }
        // )
    }
    catch (error) {
        console.log({ error })
        return {
          status: false,
          message: error.message,
          data: {}
        }
      }
}

const routeConfig = {
    method: 'POST',
    path: '/addFavoriteSalon',
    config: {
        auth: 'jwt',
        tags: ['api', 'Add Favorite'],
        description: 'Add Favorite Salon',
        notes: ['On success'],
        validate: {
        },
        handler
      }
}

module.exports = (server, opts) => {
    defaults = Hoek.applyToDefaults(defaults, opts)
    server.route(routeConfig)
}