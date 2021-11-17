const{Client} = require('pg');// or const Client = require('pg').Client; 
require('dotenv/config');

let client;
if(process.env.NODE_ENV === "production"){
     client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    })
}else{
    client = new Client({
        host: process.env.db_host,
        user: process.env.db_user,
        port: process.env.db_port,
        password: process.env.db_password,
        database: process.env.db_database,
    })
}
    

client.connect((err)=>{
    if(err) return console.log(`connection failed: ${err.message}`)
    console.log(`connected to database`);
});

module.exports = client;