const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description:{
        type: String,
        trim:true,
        required:true
    }
},{
    timestamps:true
})
const Toy = mongoose.model('Toy',userSchema)
module.exports = Toy