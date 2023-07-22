import mongoose, { Schema, model } from 'mongoose';
import { ChatModel, IChat } from './interface';

export const chatSchema = new Schema<IChat>(
    {
        chatName: {
            type: String
        },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        },
        groupAdmin: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);
export const Chat = model<IChat, ChatModel>(
    'Chat',
    chatSchema
);
