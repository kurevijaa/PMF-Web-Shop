const express = require('express')
const app = express();
const cors = require('cors');

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary')


const errorMiddleware=require('./middlewares/errors')
app.use(cors())

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

//Postavljanje konfiguracije za cloudinary 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

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