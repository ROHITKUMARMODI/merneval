const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET 
module.exports = (req, res, next) => {

    console.log("req.header",req.header)
    const token = req.header("x-access-token")

    if(!token) {
        return res.status(403).json({success: false, msg: "No token found"});
    }

    try {
        const decode = jwt.verify(token, tokenSecret);

        req.userId = decode.userId;
        let type = decode.type;
        if(type != 1) {
            return res.status(401).json({success: false,message: "You are not Authorized to access this resource"});
        }

        next();
    } catch(err) {
        return res.status(401).json({success: false,message: "Token is expired or corrupt"});
    }
}
