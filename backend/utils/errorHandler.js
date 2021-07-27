//Error handler klasa
//Nasljeđujemo error klasu
class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports=ErrorHandler;