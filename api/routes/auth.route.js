import express from 'express';

import { signin, signup, google, signout, sendNotMail} from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.post('/sendmail', sendNotMail);

export default router;
