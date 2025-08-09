import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// Middleware to protect routes
export const protect = async (req, res, next) => {
     try {
          // 1. Get token from header
          const token = req.header("Authorization")?.replace("Bearer ", "");

          if (!token) {
               return res.status(401).json({
                    success: false,
                    message: "No token, authorization denied",
               });
          }

          // 2. Verify token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);


          req.user = await User.findById(decoded.id);
          if(req.user){
               console.log("user is authenticated")
          }


          // 3. Add user from payload
          req.user = {
               id: decoded.id,
               role: decoded.role,
          };

          next();
     } catch (err) {
          console.error("Auth middleware error:", err);
          return res.status(401).json({
               success: false,
               message: "Token is not valid",
          });
     }
};

// Middleware to authorize roles
export const authorize = (roles) => {
     return (req, res, next) => {
          if (!req.user || !roles.includes(req.user.role)) {
               return res.status(403).json({
                    success: false,
                    message: "Not authorized to access this route",
               });
          }
          next();
     };
};