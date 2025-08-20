const {JWT_ADMIN_PASSWORD}= require("../../config");
const jwt = require("jsonwebtoken");

function adminMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Authorization header missing or invalid"
        });
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
        const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
module.exports={
    adminMiddleware:adminMiddleware
}