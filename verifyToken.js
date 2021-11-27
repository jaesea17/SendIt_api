const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    const token = req.headers.Authorization; 
    console.log("****req", req);
    console.log("****req.header",req.headers);
    console.log("***",req.body);
    console.log("verifytoken:", token);
    if(!token) return res.status(401).send("access denied");
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRETE);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
};