import { Router } from "express";
import importChats from "../controllers/chatController";
import multer from "multer";

const upload = multer();
const router = Router();

router.post('/import', upload.single('file'), importChats);

export default router;