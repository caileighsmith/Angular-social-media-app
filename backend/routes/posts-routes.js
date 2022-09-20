const express = require('express')

const router = express.Router()
const Post = require('../models/post.model')

router.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', "*") //Allowing cross-domain access,
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
    next();
}); 


//post api
router.post("", (req, res, next)=>{
    const postPayload = new Post({
        title: req.body.title,
        content: req.body.content
    })
    postPayload.save().then(result=>{
        console.log(result)
        res.status(201).json({
            message: 'successful post add.',
            postId: result._id
        }
        );
    });
    })


router.put('/:id', (req, res, next)=>{
    const post =({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content
    })
    console.log('id:',req.params.id)
    Post.updateOne({_id: req.body._id}, post).then(result =>{
        console.log(result)
        res.json({message: 'successful update.'})
    })
})

router.get('/:id',(req, res, next)=>{ //fetches post(s)
    Post.findById(req.params.id).then(post => {
        if (post){
            res.json(post)
        }else{
            res.json({message: 'post with id: '+req.params.id +'does not exist.'})
        }
    })
})


router.get('', (req, res, next)=>{
    Post.find()
        .then(documents =>{
            console.log(documents)
            res.json({
                posts: documents
            })
        })
})

router.delete("/:id", (req, res, next)=>{
    Post.deleteOne({
        _id: req.params.id
    }).then(result=>{
        console.log(result)
        res.json({message: 'Post successfully deleted.'})
    })
    
})

module.exports = router;