const{Client} = require('pg');// or const Client = require('pg').Client; 
require('dotenv/config');

const client = new Client({
    host: process.env.db_host,//'localhost',
    user: process.env.db_user,//'postgres',
    port: process.env.db_port,//5432,
    password: process.env.db_password,//'kajas017',
    database: process.env.db_database,//'sql_demo'
})

client.connect((err)=>{
    if(err) return console.log(`connection failed: ${err.message}`)
    console.log(`connected to database`);
});

module.exports = client;