// const messageSchema = mongoose.Schema(
//
// );

import { Model } from 'mongoose';
import { IChat } from '../chat/interface';

// const MessageSchema = new mongoose.Schema(
//     {
//         chatId: {
//             type: String
//         },
//         senderId: {
//             type: String
//         },
//         text: {
//             type: String
//         }
//     },
//     {
//         timestamps: true
//     }
// );

export type IMessage = {
    chatId: string;
    senderId: string;
    text: string;
};

export type MessageModal = Model<
    IChat,
    Record<string, unknown>
>;
