const express = require('express')
const app = express();
const cors = require('cors');
const orderRouter = require('./Back-end/api/orderRoutes');
const db = require('./Back-end/config/db');
const userRouter = require('./Back-end/api/userRoutes');
const adminRouter = require('./Back-end/api/adminRoutes');
const cookieParser = require('cookie-parser');

//using Middlewear
// var corsOptions = {
//     origin: 'http://localhost:3001',
//     }
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Route middlewear
app.use('/inventory', orderRouter);
app.use('/user', userRouter);
app.use('/admin',adminRouter);

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}...`));
