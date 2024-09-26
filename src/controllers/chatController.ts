import { Request, Response } from 'express';
import { Chat } from '../models/Chat';
import { parseExcelFile } from '../helpers/excelHelper';

export const importChats = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }
        const chats = await parseExcelFile(file.path);
        await Chat.insertMany(chats);
        res.status(200).send('Chats imported successfully.');
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}