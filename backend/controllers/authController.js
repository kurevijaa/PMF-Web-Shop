const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require ('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto');
const user = require('../models/user');

//CONTROLLER METODE

// Registriraj korisnika => /api/v1/register
exports.registerUser = catchAsyncErrors( async(req, res, next) => {

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id: 'webshop%20testing/businessman-character-avatar-isolated_24877-60111_sdggoe',
            url: 'https://res.cloudinary.com/djntlk65g/image/upload/v1626192951/webshop%20testing/businessman-character-avatar-isolated_24877-60111_sdggoe.jpg'
        }
    })

    sendToken(user, 200, res)
})

// Login korisnika => /api/v1/login
exports.loginUser = catchAsyncErrors ( async(req,res,next) => {
    const { email, password } = req.body;

    //Provjerava jesu li uneseni email i lozinka
    if(!email || !password) {
        return next(new ErrorHandler('Molimo unesite e-mail i lozinku',400))
    }

    //Pronalazak korisnika u bazi
    const user = await User.findOne({ email }).select('+password')

    if(!user) {
        return next(new ErrorHandler('Krivo ste unijeli email ili lozinku',401));
    }

    //Provjera je li unesena lozinka ispravna
    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler('Krivo ste unijeli email ili lozinku',401));
    }

    sendToken(user, 200, res)

})

// Zaboravljena lozinka => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('Korisnik s navedenom email adresom nije pronađen',404));
    }

    // dohvati reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    // stvaranje URL-a za reset lozinke
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;

    const message = `Vaš token za reset lozinke je slijedeći:\n\n${resetUrl}\n\nAko niste zatražili ovaj email, ignorirajte ga.`

    try {

        await sendEmail({
            email: user.email,
            subject: 'PMF Web Shop Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Mail za oporavak poslan na: ${user.email}`
        })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return next(new ErrorHandler(error.message, 500))

    }

})

// reset lozinke => /api/v1/password/forgot
exports.resetPassword = catchAsyncErrors(async(req,res,next) => {


    //Hash URL token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest
    ('hex')

    const user = await User.findOne({
        resetPasswordToken, 
        resetPasswordExpire: {$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHandler('Token za reset lozinke nije valjan, ili je istekao',400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler('Lozinke se ne podudaraju',400))
    }

    //Postavljanje nove lozinke

    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200,res)
})

// Dohvati trenutno prijavljenog korisnika /api/v1/me
exports.getUserProfile = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Promjena lozinke => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async(req,res,next) => {
    const user = await User.findById(req.user.id).select('+password');

    // provjera prošle korisničke lozinke
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('Niste unijeli ispravno staru lozinku',400));
        
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user,200,res)

})

// Ažuriranje korisničkog profila => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    //update avatar: TO DO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        sucess: true
    })
})


// Logout korisnika => /api/v1/logout
exports.logout = catchAsyncErrors(async(req,res,next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Odjavljeni ste'
    })
})

// Admin rute


// Dohvati SVE korisnike => /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Dohvati detalje korisnika => /api/v1/admin/user:id
exports.getUserDetails = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('Traženi korisnik ne postoji'))
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Ažuriranje korisničkog profila => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async(req,res,next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }


    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        sucess: true
    })
})


// Izbriši korisnika => /api/v1/admin/user:id
exports.deleteUser = catchAsyncErrors(async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler('Traženi korisnik ne postoji'))
    }
    await user.remove();

    // Brisanje avatara s cloudinary - TODO

    res.status(200).json({
        success: true,
        
    })
})