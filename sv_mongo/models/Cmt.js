const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CmtSchema = new Schema(
    {
        post:{
            type: Schema.Types.ObjectId,
            ref: 'posts'
        },
        content:{
            type: String,
            require: true
        },
        cmttype:{
            type: String,
            enum: ['Feedback', 'Additional']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }
)
module.exports = mongoose.model('cmts',CmtSchema)
