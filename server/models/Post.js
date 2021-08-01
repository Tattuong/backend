const mongoose = require('mongoose')
const Schema  = mongoose.Schema

const postSchema  = new Schema({
    title:{
        type: String,
        require: true,
    },
    description: {
        type: String
    },
    url:{
        type: String
    },
    Status:{
        type: String,
        enum: ['TO LEARN', 'LEARNING', 'LEARNED']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})
module.exports = mongoose.model('posts', postSchema)

