import { Request, Response } from 'express';   
import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validateRegister, validateLogin } from '../utils/validators';

const secret = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        const { error } = validateRegister(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email });
        if (user) return res.status(400).send('User already registered.');

        user = new User({ username, email, password });
        await user.save();

        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '1h' });
        res.status(201).send({"message":"User Authenticated Successfully!", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const { error } = validateLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email });
        if (!user) return res.status(400).send('Invalid email or password.');

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send('Invalid email or password.');

        const token = jwt.sign({ _id: user._id }, secret, { expiresIn: '1h' });
        res.status(200).send({"message":"User Authenticated Successfully!", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
}