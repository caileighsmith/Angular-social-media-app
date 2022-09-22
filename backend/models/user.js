const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const userModel = mongoose.Schema({ //PostModel is the schema for posts.
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userModel.plugin(uniqueValidator) //validates unique.

module.exports = mongoose.model('User', userModel);