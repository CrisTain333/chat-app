import mongoose, { Schema, model } from 'mongoose';
import { ChatModel, IChat } from './interface';

export const chatSchema = new Schema<IChat>(
    {
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
    },
    { timestamps: true }
);
export const Chat = model<IChat, ChatModel>(
    'Chat',
    chatSchema
);
