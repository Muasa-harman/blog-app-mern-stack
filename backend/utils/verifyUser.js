import jwt from 'jsonwebtoken'
import { errorHandler } from "./error.js";
export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(400, "Unauthorised"));
    }
    jwt.verify(token, process.env.JWT_SERCET, (error,user)=>{
        if(error){
            return next(errorHandler(401, 'Unauthirised'));
        }
        req.user = user;
        next();
    });
}