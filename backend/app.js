const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const Post = require('./models/post.model')
const postRoutes = require('./routes/posts-routes')

const app = express();

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*") //Allowing cross-domain access,
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
}); 

mongoose.connect('mongodb+srv://cai:AL6gVCHbdWwyEK59@cluster0.xibglw0.mongodb.net/node-angular?retryWrites=true&w=majority')
    .then(()=>{
        console.log('successful database connection made.')
    })
    .catch(()=>{
        console.log('unsuccesful database connection, try again.')
    })

app.use(bodyParser.json()); //middlewear applies to all below.
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use('/api/posts',postRoutes)


module.exports = app;