const app=require('./app')
const connectDatabase=require('./config/database')

const dotenv=require('dotenv');
const { connect } = require('./routes/product');
const cloudinary = require('cloudinary')



//Handle uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Gašenje servera: Uncaught exception');
    process.exit(1)
})

//Postavljanje config file-a

dotenv.config({path: './backend/config/config.env'})

//Spajanje na bazu

connectDatabase();

//Postavljanje cloudinary konfiguracije
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

})

const server = app.listen(4000, () =>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV}  mode.`);
    
})

//Handle Unhandled Promise rejections
process.on('unhandledRejection',err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Gašenje servera: Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})