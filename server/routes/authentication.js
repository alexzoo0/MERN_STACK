import express from 'express';


import { RegisterNow, signin } from '../controllers/authentication.js';

const router =  express.Router();

router.post('/RegisterNow', RegisterNow);
router.post('/signin', signin);

export default router;