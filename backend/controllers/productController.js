const Product=require('../models/product')

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')


//Stvori novi proizvod   =>  /api/v1/admin/product/new
exports.newProduct=catchAsyncErrors(async(req,res,next) =>{
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    
    res.status(201).json({
        success:true,
        product
    })
})

// dohvati sve podatke   =>   /api/v1/products?keyword=hoodica
exports.getProducts = catchAsyncErrors(async (req, res, next) =>{

    const resPerPage = 2;
    const productCount = await Product.countDocuments();

    const APIFeaturess = new APIFeatures(Product.find(),req.query)
                        .search()
                        .filter()
                        .pagination(resPerPage)
    const products=await APIFeaturess.query;

    res.status(200).json({
        success: true,
        count:products.length,
        productCount,
        products
    })
})


//dohvati detalje o jednom proizvodu   =>   /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Proizvod nije pronađen', 404));
    }

    res.status(200).json({
        success:true,
        product

    })
})


//Ažuriranje proizvoda   =>   /api/v1/admin/product/:id
exports.updateProduct =catchAsyncErrors(async(req,res,next) => {
    
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Proizvod nije pronađen', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false

    })
    res.status(200).json({
        success:true,
        product
    })
})

//Brisanje proizvoda   =>   /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncErrors(async (req,res,next) => {

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('Proizvod nije pronađen', 404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message:'Proizvod je izbrisan.'
    })


})
