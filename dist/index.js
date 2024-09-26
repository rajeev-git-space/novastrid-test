"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var multer_1 = __importDefault(require("multer"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
var upload = (0, multer_1.default)({ dest: 'uploads/' });
app.use('/auth', require('./routes/authRoutes'));
app.use('/user', require('./routes/taskRoutes'));
app.use('/chat', require('./routes/chatRoutes'));
app.get('/', function (req, res) {
    res.send('App Running at PORT: ' + PORT);
});
var mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/chatapp';
mongoose_1.default.connect(mongoURI).then(function () {
    console.log('Connected to MongoDB');
}).catch(function (err) {
    console.log(err);
});
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
