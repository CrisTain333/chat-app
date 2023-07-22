import { Model, Types } from 'mongoose';

export type IChat = {
    chatName: string;
    isGroupChat: boolean;
    users: Types.ObjectId;
    latestMessage: Types.ObjectId;
    groupAdmin: Types.ObjectId;
};

export type ChatModel = Model<IChat, Record<string, unknown>>;
