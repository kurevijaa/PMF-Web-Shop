// Stvaranje i slanje tokena i spremanje u kolačić
const sendToken = (user, statusCode, res) => {
    // stvaranje jwt tokena
    const token = user.getJwtToken();

    // opcije za kolačiće
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}
module.exports = sendToken; 