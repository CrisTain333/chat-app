import { Model } from 'mongoose';

export type IChat = {
    members: string[];
};

export type ICreateChatPayload = {
    senderId: string;
    receiverId: string;
};

export type ChatModel = Model<
    IChat,
    Record<string, unknown>
>;
