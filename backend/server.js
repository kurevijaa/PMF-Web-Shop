const app=require('./app')
const connectDatabase=require('./config/database')

const dotenv=require('dotenv');
const { connect } = require('./routes/product');



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