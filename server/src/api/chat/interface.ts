import { Model } from 'mongoose';

export type IChat = {
    members: string[];
};

export type ChatModel = Model<
    IChat,
    Record<string, unknown>
>;
