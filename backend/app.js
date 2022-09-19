const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Post = require('./models/post.model')

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

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*") //Allowing cross-domain access,
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
}); //applied to all incoming reqs


//post api
app.post("/api/posts", (req, res, next)=>{
    const postPayload = new Post({
        title: req.body.title,
        content: req.body.content
    })
    postPayload.save()
    res.status(201).json({
        message: 'successful post add.'
    }
    );
});


app.get('/api/posts', (req, res, next)=>{
    Post.find()
        .then(documents =>{
            console.log(documents)
            res.json({
                posts: documents
            })
        })

    
    
})

app.delete("/api/posts/:id", (req, res, next)=>{
    Post.deleteOne({
        _id: req.params.id
    }).then(result=>{
        console.log(result)
        res.json({message: 'Post successfully deleted.'})
    })
    
})


module.exports = app;