// const messageSchema = mongoose.Schema(
//
// );

import { Model } from 'mongoose';
import { IChat } from '../chat/interface';

export type IMessage = {
    chatId: string;
    senderId: string;
    text: string;
};

// export class IMessagePayload   = {

// }

export type MessageModal = Model<
    IChat,
    Record<string, unknown>
>;
