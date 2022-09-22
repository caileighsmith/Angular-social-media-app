const jwt = require('jsonwebtoken')


//exporting middleware function
module.exports = (req, res, next)=>{

    try{
        const token = req.headers.authorization.split(" ")[1] //auth in header
        //success case.
        jwt.verify(token, 'secret_json_key');
        next();
    }catch(error){
        res.json({
            message: 'failed auth.'
        })
    }
    

}