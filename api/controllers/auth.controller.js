import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// Import and load dotenv
import dotenv from 'dotenv';
dotenv.config();

const jwtSecretKey = process.env.JWT_SECRET;
console.log(jwtSecretKey, "jwt secret key");



export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, jwtSecretKey);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('access_token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      res
        .cookie('access_token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};


export const signout = (req, res) => {
  res.clearCookie('access_token').status(200).json('Signout success!');
};




import nodemailer from "nodemailer";

// Your code here


export const sendNotMail = async (req,res) => {
  const {email} = req.body
  const otp = Math.floor(100000 + Math.random() * 900000);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jambhulkarrishabh@gmail.com", // Replace with your Gmail email address
        pass: "hitxyoywsfafizqf", // Replace with your Gmail password (or use an app password)
      },
    });

    // Email options
    const mailOptions = {
      from: "jambhulkarrishabh@gmail.com", // Replace with your Gmail email address
      to: email,
      subject: "subject",
      html: `<h1> Congratulations you successfully sent email. OTP : ${otp} </h1>`

    };

    // Send email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error, "Internal Server Error");
      } else {
        console.log("Email sent:" + info.response);
        console.log("Email sent successfully");
      }
    });
  } catch (err) {
    console.log(err);
  }
}
