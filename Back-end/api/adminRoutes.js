const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const{adSignUpValidation,adSignInValidation} = require('../../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//SIGNUP
router.put('/signUp',async(req,res) =>{
    const validation = adSignUpValidation(req.body);
    if(validation.error) return console.log(validation.error.details[0].message);
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    //checking if idNumber and email exist   
    try{
        let Admin = await pool.query(
            `SELECT * 
            FROM admin
            WHERE id_number = $1`,[req.body.idNumber]);
            if(Admin.rows.length == 0) return console.log(`*****id is not an admin`);
            let adminEmail = Admin.rows.map((item) => {return item.email});
            if(adminEmail[0] != null) return console.log('******admin account already exist');
        }catch(err){
            if(err) return console.log(err)
        };
    
   
    let{idNumber,email} = req.body;
    let password = hashedPassword;
    
    //updating client
    try{
        await pool.query(
            `UPDATE admin
            SET email = $1, password = $2
            WHERE id_number = $3`,
            [email,password,idNumber])
            console.log("signup successful");
            res.send("signup successful");
           // res.redirect('/sendIT_sign-in.html')
    }catch(err){
        if(err) console.log(err)
    };
});


//SIGNIN
router.post('/signIn',async(req,res) =>{
    const validation = await adSignInValidation(req.body);
    if(validation.error) return console.log(validation.error.details[0].message);
    
    //checking admin validity
    try{
        let Admin = await pool.query(
            `SELECT * 
            FROM admin
            WHERE id_number = $1`,[req.body.idNumber]);
        if(Admin.rows.length == 0) return console.log(`id is incorrect`);
        const validatePassword = await bcrypt.compare( req.body.password,Admin.rows[0].password) 
        if(!validatePassword) return console.log('password incorrect')
        // creating and inserting token into head
        const token = jwt.sign({id:Admin.rows[0].id_number},process.env.TOKEN_SECRETE,{expiresIn: '1h'});
      res.header('auth_token',token,{maxAge: 3600000}).send(Admin)
       console.log("signed in") 
       console.log(token);
  }catch(err){
        if(err) return console.log(err);
    }

});

    

module.exports = router;