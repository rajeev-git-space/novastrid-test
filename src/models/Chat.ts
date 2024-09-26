import mongoose, { Schema, Document } from 'mongoose';

interface IChat extends Document {
    sender: string;
    receiver: string;
    message: string;
    timestamp: Date;
}

const chatSchema = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const Chat = mongoose.model<IChat>('Chat', chatSchema);