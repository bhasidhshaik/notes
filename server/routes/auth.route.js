import express from 'express';

import upload from '../middlewares/upload.js';
import { login, logout, register } from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/register", upload.single("profile"), register);
router.post('/login', login);
router.post('/logout', logout);

export default router;
