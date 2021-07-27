const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/product');
const product = require('../models/product');

//postavljanje env fajla
dotenv.config({path: 'backend/config/config.env'})
connectDatabase();

const seedProducts = async () => {
    try {

        await product.deleteMany();
        console.log('Proizvodi su izbrisani');

        await Product.insertMany(products);
        console.log('Proizvodi su dodani');
        process.exit();
        
    } catch (error) {

        console.log(error.message);
        process.exit();

    }
}

seedProducts()