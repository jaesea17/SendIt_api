const{Pool} = require('pg');// or const Client = require('pg').Client; 
require('dotenv/config');

let pool;
if(process.env.NODE_ENV === "production"){
     pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })
}else{
    pool = new Pool({
        host: process.env.db_host,
        user: process.env.db_user,
        port: process.env.db_port,
        password: process.env.db_password,
        database: process.env.db_database,
    })
}
    

pool.connect((err)=>{
    if(err) return console.log(`connection failed: ${err.message}`)
    console.log(`connected to database`);
});

module.exports = pool;