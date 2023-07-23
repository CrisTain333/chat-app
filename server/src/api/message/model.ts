import { Schema, model } from 'mongoose';
import { IMessage, MessageModal } from './interface';

export const messageSchema = new Schema<IMessage>(
    {
        chatId: {
            type: String
        },
        senderId: {
            type: String
        },
        text: {
            type: String
        }
    },
    { timestamps: true }
);

export const Message = model<IMessage, MessageModal>(
    'Message',
    messageSchema
);
