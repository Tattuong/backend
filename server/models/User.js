const mongoose =  require('mongoose')
const Schema  = mongoose.Schema

const userSchema  = new Schema({
    username:{
        type: String,
        require: true,
        unique: true,
        min: 6,
        max: 255
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('users', userSchema)