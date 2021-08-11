const express = require('express')
const app = express();
const cors = require('cors');

const cookieParser = require('cookie-parser')

const errorMiddleware=require('./middlewares/errors')
app.use(cors())

app.use(express.json());

app.use(cookieParser())

//import svih ruta
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', order)



//Middleware za error handling
app.use(errorMiddleware);

module.exports=app