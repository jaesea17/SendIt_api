const express = require('express');
const router = express.Router();
const client = require('../config/db');
const{signUpValidation,signInValidation} = require('../../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//SIGNUP
router.post('/signUp',async(req,res) =>{
    const validation = signUpValidation(req.body);
    if(validation.error) return console.log(validation.error.details[0].message);
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    //checking email
    try{
      let emailExist = await client.query(
            `SELECT email
             FROM users
             where email= $1`,[req.body.email]);
           if(emailExist.rows.length > 0 ) return console.log(`email already exists`);
        }catch(err){
            if(err) return console.log(err);
        };
    
   
    let{firstName,lastName,email} = req.body;
    let password = hashedPassword;
    //inserting into table
    try{
       await client.query(
            "INSERT INTO users(first_name,last_name,email,password) VALUES($1,$2,$3,$4) RETURNING id, password",
            [firstName,lastName,email,password])
            console.log("signup successful")
            res.send("signup successful");
            //res.redirect('/sendIT_sign-in.html')    
    }catch(err){
        if(err) return console.log(err)
    };
     
});


//SIGNIN
router.post('/signIn',async(req,res) =>{
    const validation = await signInValidation(req.body);
    if(validation.error) return console.log(validation.error.details[0].message);
    
    //checking user validity 
    let{email,password} = req.body;
    try{
        let User = await client.query(
              `SELECT *
               FROM users
               where email= $1`,[email]);
             if(User.rows.length == 0 ) return console.log(`email incorrect`); 
             const validatePassword = await bcrypt.compare(password,User.rows[0].password) 
              if(!validatePassword) return console.log('password incorrect')
              // creating and inserting token into head
              const token = jwt.sign(
                  {
                  id:User.rows[0].id,
                  email:User.rows[0].email,
                },process.env.TOKEN_SECRETE,{
                    expiresIn: '1h' 
                });
                console.log(token);
                res.header('auth_token',token).send(User);
        }catch(err){
              if(err) return console.log(err);
          };
    
});

module.exports = router;