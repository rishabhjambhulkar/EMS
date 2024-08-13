import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    // console.log(req)
    const token = req.cookies.access_token;
    console.log('Request cookies:', req.cookies);
    console.log(token)

    if (!token) return next(errorHandler(401, 'You are not authenticated!'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Token is not valid!'));

        req.user = user;
        next();
    });

}
 

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