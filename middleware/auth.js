const jwt = require('jsonwebtoken');

const tokenkey = process.env.TOKEN_KEY 
module.exports = (req, res, next) => {

    console.log("req.header",req.header)
    const token = req.header("x-access-token")

    if(!token) {
        return res.status(403).json({success: false, msg: "No token found"});
    }

    try {
        const decode = jwt.verify(token, tokenkey);
        req.userId = decode.userId;
        next();
    } catch(err) {
        return res.status(401).json({success: false,message: "Token is expired or corrupt"});
    }
}
