// This is a copy of mongoose. model () but we need to make it available to other modules. The purpose of this copy is to avoid a race condition where one of the modules is loaded multiple times
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CmtSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: 'posts'
        },
        content: {
            type: String,
            require: true
        },
        cmttype: {
            type: String,
            enum: ['Feedback', 'Additional']
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }
)
module.exports = mongoose.model('cmts', CmtSchema)
