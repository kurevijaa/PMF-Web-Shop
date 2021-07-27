const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Molimo unesite vaše ime'],
        maxLength: [30, 'Ime ne smije biti duže od 30 znakova']
    },
    email:{
        type: String,
        required: [true, 'Molimo unesite vašu e-mail adresu'],
        unique: true,
        validate: [validator.isEmail, 'Molimo unesite ispravnu e-mail adresu']
    },
    password:{
        type: String,
        required: [true, 'Molimo unesite lozinku'],
        minlength: [6, 'Lozinka mora biti duža od 6 znakova'],
        select: false
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: 'user'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})
//enkripcija lozinke prije spremanja korisnika
userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)

})

// Usporedba lozinke
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

// Vraćanje JWT tokena
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generiranje tokena za reset lozinke
userSchema.methods.getResetPasswordToken = function () {
    //Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash, enkripcija tokena i postavljanje na resetpasswordtoken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    // postavljanje roka trajanja tokena
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    return resetToken
}

module.exports = mongoose.model('User', userSchema);