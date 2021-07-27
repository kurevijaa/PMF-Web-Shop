const express = require('express')
const app = express();

const cookieParser = require('cookie-parser')

const errorMiddleware=require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser())

//import svih ruta
const products = require('./routes/product');
const auth = require('./routes/auth');

app.use('/api/v1', products)
app.use('/api/v1', auth)

//Middleware za error handling
app.use(errorMiddleware);

module.exports=app