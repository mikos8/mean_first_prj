const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // password
const config = require('../config/db'); // db connect

//create Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        require: true //obyazatel'no
    },
    login: {
        type: String,
        require: true //obyazatel'no
    },
    password: {
        type: String,
        require: true //obyazatel'no
    }
})

const User = module.exports = mongoose.model('User', UserSchema);
module.exports.getUserByLogin = function (login, callback) {
    const query = {
        login: login
    }
    User.findOne(query, callback)
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback)
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err){throw err}
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}