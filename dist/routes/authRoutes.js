"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = (0, express_1.Router)();
router.post('/login', function (req, res) {
    res.send('Login');
});
router.post('/register', function (req, res) {
    res.send('Register');
});
exports.default = router;
