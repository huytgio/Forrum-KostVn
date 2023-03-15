const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PostSchema = new Schema(
    {
        title:{
            type: String,
            require: true,
            unique: false
        },
        pdess:{
            type: String,
            require: false
        },
        url:{
            type: String,
        },
        status:{
            type: String,
            enum: ['Will do', 'in work','complete']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }
)
module.exports = mongoose.model('posrs',PostSchema)

module.exports = mongoose.model('users',UserSchema)