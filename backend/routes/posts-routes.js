const express = require('express')
const multer = require('multer')
const { createPostfix } = require('typescript')

const router = express.Router()

const Post = require('../models/post.model')
const authWare = require('../middleware/check-auth')

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg' : 'jpg',
    'image/jpg' : 'jpg'
}

const storage = multer.diskStorage({ //middleware
    destination: (req, file, callback)=>{ //function executes each time a file is saved.
        const fileIsValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error('invalid mime type')
        if (fileIsValid){
            error = null
        }
        callback(error, "backend/images"); //path is seen relative to Server.js in root.
    },
    filename: (req, file, callback)=>{
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype]
        callback(null, name+ '-' + Date.now()+ '.' + ext)
    }
}); //This stores incoming files.



//post api
router.post("", authWare ,multer({storage: storage}).single('image') , (req, res, next)=>{
    const url = req.protocol + '://' + req.get("host")
    const postPayload = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
    })
    postPayload.save().then(createdPost=>{
        res.status(201).json({
            message: 'successful post add.',
            post: {
                ...createdPost,
                id: createdPost._id
            }
        }
        );
    });
    })


router.put('/:id', authWare,multer({storage: storage}).single('image'), (req, res, next)=>{
    
    let imagePath = req.body.imagePath;
    if (req.file){
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename
    }

    console.log(req.file)
    const post = new Post({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        imagePath: imagePath
      });

    Post.updateOne({_id: req.params.id}, post).then(result =>{
        res.json({message: 'successful update.'})
    })
})




router.get('/:id',(req, res, next)=>{ //fetches post(s)
    console.log(req.query)
    Post.findById(req.params.id).then(post => {
        if (post){
            res.json(post)
        }else{
            res.json({message: 'post with id: '+req.params.id +'does not exist.'})
        }
    })
})


router.get('', (req, res, next)=>{
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const postQuery = Post.find()
    let fetchedPosts;

    if (pageSize && currentPage){
        postQuery
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize)
    }


    postQuery
        .then(documents =>{
            fetchedPosts = documents;
            return Post.count()      
        })
        .then(count=>{
            res.json({
                posts: fetchedPosts,
                maxPosts: count
            })
        })
})



router.delete("/:id", authWare, (req, res, next)=>{
    Post.deleteOne({
        _id: req.params.id
    }).then(result=>{
        console.log(result)
        res.json({message: 'Post successfully deleted.'})
    })
    
})

module.exports = router;