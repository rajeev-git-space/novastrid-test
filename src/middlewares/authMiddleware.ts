import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send('Access denied. Invalid token.');
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid token.');
    }
}