import mongoose, { Schema, model } from 'mongoose';
import { IMessage, MessageModal } from './interface';

export const messageSchema = new Schema<IMessage>(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        content: { type: String, trim: true },
        chat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat'
        },
        readBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        ]
    },
    { timestamps: true }
);

export const Message = model<IMessage, MessageModal>(
    'Message',
    messageSchema
);
