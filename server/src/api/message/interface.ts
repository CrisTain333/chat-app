// const messageSchema = mongoose.Schema(
//
// );

import { Model, Types } from 'mongoose';
import { IUser } from '../user/interface';
import { IChat } from '../chat/interface';

export type IMessage = {
    sender: Types.ObjectId | IUser;
    content: string;
    chat: Types.ObjectId | IChat;
    readBy: Types.ObjectId | IUser;
};

export type MessageModal = Model<
    IChat,
    Record<string, unknown>
>;
