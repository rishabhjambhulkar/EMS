import express from 'express';

import { signin, signup, google, signout, sendNotMail, verify_otp} from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.post('/sendmail', sendNotMail);
router.post('/verifyOtp', verify_otp);
export default router;
