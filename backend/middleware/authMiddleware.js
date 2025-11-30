const jwt = require("jsonwebtoken");
const User = require("../models/User");

//Middleware to protect routes
const protect = async (req,res,next) => {
    try{
        let token = req.headers.authorization;

        if(!token){
            return res.status(401).json({message: "Not Authorized, no token"});
        }

        // Check if token starts with "Bearer " (with space)
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]; //Extract token
        } else if(token.startsWith("Bearer")){
            // Handle case where there's no space after Bearer
            token = token.substring(7); // Remove "Bearer" (6 chars) + 1
        }
        
        // Trim any whitespace
        token = token.trim();

        if(!token){
            return res.status(401).json({message: "Not Authorized, no token"});
        }

        // Debug: Log token length and first/last chars (remove quotes if present)
        // Remove any surrounding quotes
        token = token.replace(/^["']|["']$/g, '');
        
        // Validate JWT format (should have 3 parts separated by dots)
        const parts = token.split('.');
        if(parts.length !== 3){
            return res.status(401).json({
                message: "Invalid token format", 
                error: "JWT must have 3 parts separated by dots",
                receivedLength: token.length,
                partsCount: parts.length
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");
        
        if(!req.user){
            return res.status(401).json({message: "User not found"});
        }
        
        next();

    } catch (error) {
        res.status(401).json({message: "Token Failed", error: error.message});
    }
};

//Middleware for Admin-only access

const adminOnly = (req, res, next) => {
    if(req.user && req.user.role === "admin"){
        next();
    } else {
        res.status(403).json({message: "Access denied, admin only"});
    }
};

module.exports = {protect, adminOnly};