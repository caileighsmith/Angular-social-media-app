const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const router = express.Router()

router.post("/signup", (req, res, next)=>{
    bcrypt.hash(req.body.password, 10)
        .then(hash=>{
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(result=>{
                    res.json({
                        message: 'user created',
                        result: result
                    })
                })
                .catch(err =>{
                    res.json({
                        error: err
                    })
                }
        )}) 
})

router.post('/login', (req, res, next)=>{
    User.findOne({
        email: req.body.email
    }).then(user=>{
        if (user){
            return bcrypt.compare(req.body.password, user.password)
                
        }else{
            return res.json({
                message: 'bad auth.'
            })
        }
    })
    .then(result =>{
        if (result){
            //if successful - valid password.
            //Creating JSON webtoken.
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            },
            'secret_json_key',
            {expiresIn: '1h'}
            );
            res.status(200).json({
                token: token,
                message: 'succesful auth.'
            })

        }else{
            //if not auth
            return res.json({
                message: 'bad auth.'
            })
        }
    })
    .catch(err=>{
        return res.json({
            message: 'bad auth.'
        })
    })
})



module.exports = router;