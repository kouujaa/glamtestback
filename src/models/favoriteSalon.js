const Mongoose = require('mongoose')

const Schema = Mongoose.Schema

const FavoriteSalonSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    salonId:
        {
          type: Schema.Types.ObjectId,
          ref: 'salons'
        },
    salonName: {
        type: String,
        default: ''
    },
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
)
module.exports = Mongoose.model('FavoriteSalon', FavoriteSalonSchema)