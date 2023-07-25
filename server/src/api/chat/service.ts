/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { Request } from 'express';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { ICreateChatPayload } from './interface';
import { Chat } from './model';
import { User } from '../user/model';

const createChat = async (payload: ICreateChatPayload) => {
    const { receiverId, senderId } = payload;
    try {
        const newChat = new Chat({
            members: [senderId, receiverId]
        });

        // Update the sender's friends list to include the receiver
        await User.findByIdAndUpdate(senderId, {
            $addToSet: { friends: receiverId } // $addToSet ensures no duplicates
        });

        // Update the receiver's friends list to include the sender
        await User.findByIdAndUpdate(receiverId, {
            $addToSet: { friends: senderId } // $addToSet ensures no duplicates
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
        }).populate('members', '-password');
        console.log(chat);

        return chat;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            `Failed to get chat's`
        );
    }
};

const findChat = async (req: Request) => {
    try {
        const chat = await Chat.findOne({
            members: {
                $all: [
                    req.params.firstId,
                    req.params.secondId
                ]
            }
        });
        return chat;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'failed to find chat'
        );
    }
};

export const ChatService = {
    createChat,
    getChats,
    findChat
};
