const user = require("../models/user");

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

// provjerava je li korisnik autoriziran ili ne 
exports.isAuthenticatedUser = catchAsyncErrors( async (req,res,next) => {
 
    const { token } = req.cookies

    if(!token){
        return next(new ErrorHandler('Prijavite se da biste pristupili ovom resursu.',401))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await user.findById(decoded.id);

    next()
})

// handle uloga korisnika
exports.authorizeRoles = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(
                new ErrorHandler(`Uloga (${req.user.role}) ne može pristupiti ovom resursu`,
                403))
        }
        next()
    }
}