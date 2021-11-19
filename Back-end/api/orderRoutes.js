const express = require('express');
const { sendEmail } = require('../../email');
const verify = require('../../verifyToken');
const router = express.Router();
const pool = require('../config/db');

//create order,user
router.post('/orders',verify,async(req,res)=>{
 let{package: item,weight,fCountry,fAddress,
    fCity,fState,tCountry,
    tAddress,tCity,tState}= req.body;
    console.log("req.body",req.body)
     //getting the customer id and email from req.user contained in the "verify" function
      let customerId = req.user.id;
      let email = req.user.email; 
     try{
        await pool.query(
            `INSERT INTO orders(item,weight,f_country,f_address,
                f_city,f_state,t_country,t_address,t_city,t_state,email,customer_id) 
            VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
            [item,weight,fCountry,fAddress,
                fCity,fState,tCountry,
                tAddress,tCity,tState,email,customerId],(err,result)=>{
                    if(err) return console.log(err)
                    res.send(result.rows);
                    console.log("item:", item);
                    console.log("weight:", weight);
                })           
    }catch(err){
            if(err) return console.log(err)
        };
 });
 
 
 // get all orders,admin
 router.get('/orders/admin',verify,async(req,res)=>{
     console.log("this is the request")
     try{
       await pool.query(`SELECT * 
         FROM orders`,(err,result)=>{
             if(err) return console.log(err)
            res.send(result.rows);
         })

     }catch(err){
        if(err) return console.log(err);
     }
 });

 
 //get single order, user and admin
 router.get('/orders/:orderNumber',async(req,res)=>{
     let {orderNumber} = req.params;
    try{
        await pool.query(`SELECT * 
        FROM orders
        WHERE order_number  = $1`,
         [orderNumber],(err,result)=>{
            if(err) return console.log(err)
           // console.log(result.rows);
             res.send(result.rows);
        })

    }catch(err){
       if(err) return console.log(err);
    }
});


 //get all orders of particular user, user
 router.get('/orders',verify,async(req,res)=>{
    let customerId = req.user.id;
    try{
        pool.query(`SELECT * 
       FROM orders
       WHERE customer_id  = $1`,
        [customerId],(err,result)=>{
           if(err) return console.log(err)
          // console.log(result.rows);
            res.send(result.rows);
       })

   }catch(err){
      if(err) return console.log(err);
   }
});



//update order, user
router.put('/orders/:orderNumber',verify,async(req,res)=>{
    let{tCountry,tAddress,tCity,tState,orderNumber}= req.body;
    try{
        await pool.query(
            `UPDATE orders
            SET  t_country=$1, t_address=$2,
            t_city=$3, t_state=$4
            WHERE order_number = $5 RETURNING *`,
            [tCountry,tAddress,tCity,tState,orderNumber],(err,result)=>{
                    if(err) return console.log(err);
                    res.send(result.rows);
                })

    }catch(err){
       if(err) return console.log(err);
    }
});


//delete order, user
router.delete('/orders',verify,async(req,res)=>{
    let {orderNumber} = req.body;
    console.log("req.body:",req.body);
    try{
         pool.query(`DELETE FROM orders
         WHERE order_number = $1 RETURNING *`, [orderNumber],(err,result)=>{
            if(err) return console.log(err)
            console.log("deleted successfully");
            res.send(result.rows);
        })

    }catch(err){
       if(err) return console.log(err);
    }
});



//update order,admin
router.put('/orders/admin/:orderNumber',verify,async(req,res)=>{
    let{status,location,orderNumber,customerEmail}= req.body;
    let text = `Parcel status is : ${status}   Parcel location is : ${location}`
                    
    let message = {
        from: "from-example@email.com",
        to:customerEmail,
        subject: "status/location update",
        text:text
    };
    try{
            pool.query(
                `UPDATE orders
                SET  status=$1, location=$2       
                WHERE order_number = $3 RETURNING *`,
                [status,location,orderNumber],(err,result)=>{
                    if(err) return console.log(err)
                    res.send(result.rows);
                    console.log(result.rows);
                    sendEmail(message); 
                }
            )
    }catch(err){
       if(err) return console.log(err);
    }
});


 module.exports = router;