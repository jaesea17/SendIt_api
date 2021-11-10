const jwt = require('jsonwebtoken');

module.exports = (req,res,next) =>{
    //const token = req.header('auth_token');
    const token = req.cookies.auth_token;
    if(!token) return res.status(401).send("access denied");
    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRETE);
        req.user = verified;
        next();
    }catch(err){
        res.status(400).send('Invalid Token');
    }
};