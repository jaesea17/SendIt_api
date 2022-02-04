const{Pool} = require('pg');// or const Client = require('pg').Client; 
require('dotenv/config');

let pool;
if(process.env.NODE_ENV === "production"){
     pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl:{
            ssl: true,
            rejectUnauthorized: false
        }
    })
}else{
    pool = new Pool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    })
}
    

pool.connect((err)=>{
    if(err) return console.log(`connection failed: ${err.message}`)
    console.log(`connected to database`);
});

 module.exports = pool;