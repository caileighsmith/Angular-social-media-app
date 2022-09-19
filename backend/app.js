const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json()); //middlewear applies to all below.
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*") //Allowing cross-domain access,
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
}); //applied to all incoming reqs

app.post("/api/posts", (req, res, next)=>{
    const postPayload = req.body;
    console.log(postPayload);
    res.status(201).json({
        message: 'successful post add.'
    }
    );
});


app.get('/api/posts', (req, res, next)=>{
    const posts = [
        {
            id: '12345',
            title: 'first post',
            content: 'this is some content.'
        },
        {
            id: '12345',
            title: 'first post',
            content: 'this is some content.'
        },
        
    ];
    res.json({
        posts: posts
    })
})


module.exports = app;