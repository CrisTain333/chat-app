/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { ICreateChatPayload } from './interface';
import { Chat } from './model';

const createChat = async (payload: ICreateChatPayload) => {
    const { receiverId, senderId } = payload;
    try {
        const newChat = new Chat({
            members: [senderId, receiverId]
        });

        const result = await newChat.save();
        //  res.status(200).json(result);
        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to create chat'
        );
    }
};

const getChats = async (userId: string) => {
    try {
        const chat = await Chat.find({
            members: { $in: [userId] }
        });
        return chat;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            `Failed to get chat's`
        );
    }
};

export const ChatService = { createChat, getChats };
