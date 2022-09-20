const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post.model')
const postRoutes = require('./routes/posts-routes')

const app = express();

mongoose.connect('mongodb+srv://cai:AL6gVCHbdWwyEK59@cluster0.xibglw0.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(()=>{
        console.log('successful database connection made.')
    })
    .catch(()=>{
        console.log('unsuccesful database connection, try again.')
    })

app.use(bodyParser.json()); //middlewear applies to all below.
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/posts',postRoutes)


module.exports = app;