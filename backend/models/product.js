const mongoose=require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Molimo unesite ime proizvoda!'],
        trim:true,
        maxLength:[100, 'Ime proizvoda ne smije sadržavati više od 100 znakova!']
    },
    price:{
        type:Number,
        required: [true, 'Molimo unesite cijenu proizvoda!'],
        maxLength:[5, 'Cijena ne premašuje 99999!'],
        default:0.0
    },
    description:{
        type:String,
        required: [true, 'Molimo unesite opis proizvoda!']
        
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true, 'Molimo odaberite kategoriju proizvoda!'],
        enum:{
            values:[
                'Kratke majice',
                'Hoodice',
                'Ostalo'
            ],
            message:'Molimo odaberite kategoriju za proizvod!'
        }

    },
    seller:{
        type:String,
        required:[true, 'Molimo navedite prodavača!']
    },
    stock:{
        type:Number,
        required:[true, 'Molimo navedite broj proizvoda na stanju!'],
        maxLength:[5, 'Broj proizvoda na stanju ne premašuje 99999!'],
        default:0

    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true

            },
            comment:{
                type:String,
                required:true

            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }



})



module.exports=mongoose.model('Product',productSchema);