const mongoose = require('mongoose');
const { post } = require('../app');

const postModel = mongoose.Schema({ //PostModel is the schema for posts.
    title: {type: String, required: true},
    content: {type: String, required: true}
});

module.exports = mongoose.model('Post', postModel);