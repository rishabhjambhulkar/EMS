import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the token part after "Bearer"

    console.log('Request Authorization Header:', authHeader);
    console.log('Access Token:', token);

    // Check if the token exists
    if (!token) {
        return next(errorHandler(401, 'You are not authenticated!'));
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(403, 'Token is not valid!'));
        }

        // If the token is valid, attach the user to the request object
        req.user = user;
        next();
    });
};
 

export const signEmailOTpToken = (payload) => {
    return new Promise((resolve, reject)=>{
        // const payload={};
        const secretKey = process.env.JWT_SECRET;
        const options= {
            expiresIn: '120s',
        }
        jwt.sign(payload, secretKey, options, (err, token)=>{
            if(err){
                return reject(err)
            }
            return resolve(token)
        })
    })
}


export const verifyEmailOtpToken = (token)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
            if(err){
               return reject(err)
            }
            const otp = payload.otp;
            const email = payload.email;
            resolve({otp: otp, email: email})
        })
    })
}