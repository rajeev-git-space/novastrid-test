"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var secret = process.env.JWT_SECRET || 'secret';
var authMiddleware = function (req, res, next) {
    var _a;
    var token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return res.status(401).send('Access denied. Invalid token.');
    try {
        var verified = jsonwebtoken_1.default.verify(token, secret);
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token.');
    }
};
exports.authMiddleware = authMiddleware;
