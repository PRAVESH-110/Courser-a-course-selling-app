const {JWT_USER_PASSWORD}= require("../../config");
const jwt = require("jsonwebtoken");

function userMiddleware(req,res,next){
    const token=req.body.token;
    
    if (!token) {
        return res.status(401).json({
            message: "Token is required"
        });
    }
    
    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
module.exports={
    userMiddleware:userMiddleware
}