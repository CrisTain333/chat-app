import mongoose, { Schema } from 'mongoose';
import { IChat } from './interface';

export const chatSchema = new Schema<IChat>({
    chatName: {
        type: String
    },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
