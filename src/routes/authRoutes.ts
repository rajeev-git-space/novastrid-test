import { Router } from "express";
import { login, register } from "../controllers/authController";

const router = Router();

router.post('/login', (req, res) => {
    res.send('Login');
});

router.post('/register', (req, res) => {
    res.send('Register');
});

export default router;