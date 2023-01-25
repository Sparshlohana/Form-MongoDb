const mongoose = require('../database/index');
const uuid = require('uuid')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;