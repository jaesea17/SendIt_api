const express = require('express')
const app = express();
const cors = require('cors');
const orderRouter = require('./Back-end/api/orderRoutes');
const db = require('./Back-end/config/db');
const userRouter = require('./Back-end/api/userRoutes');
const adminRouter = require('./Back-end/api/adminRoutes');
const cookieParser = require('cookie-parser');

//using Middlewear
    let corsOptions = {
        origin: 'https://jreact-sendit.herokuapp.com'
    }
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Route middlewear
app.use('/inventory', orderRouter);
app.use('/user', userRouter);
app.use('/admin',adminRouter);

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to SendIT</h1>
              <h3>SendIT is a courier service that helps users deliver parcels worldwide.
              It provides courier quotes based on weight categories.</h3>
              <p>For any more information please visit our
              <a href='https://github.com/jaesea17/SendIt_api'>
              Github repo!</a></p>
              <h4>Thank you for visiting  &#x1F600;</h4>
              `);
  });

app.get('*', (req, res) => httpResponse(res, {
    statusCode: 400,
    status: 'failure',
    message: 'Oops! Not found',
  }));

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log(`listening on port ${port}...`));


