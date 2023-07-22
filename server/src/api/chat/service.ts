/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { User } from '../user/model';
import { Chat } from './model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const accessChat = async (req: any) => {
    const { userId } = req.body;

    if (!userId) {
        console.log('UserId param not sent with request');
        // return res.sendStatus(400);
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'UserId param is required'
        );
    }

    let isChat: any = await Chat.find({
        isGroupChat: false,
        $and: [
            {
                users: { $elemMatch: { $eq: req.user._id } }
            },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate('users', '-password')
        .populate('latestMessage');

    isChat = await User.populate(isChat, {
        path: 'latestMessage.sender',
        select: 'name pic email'
    });

    if (isChat.length > 0) {
        return isChat[0];
    } else {
        const chatData = {
            chatName: 'sender',
            isGroupChat: false,
            users: [req.user._id, userId]
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({
                _id: createdChat._id
            }).populate('users', '-password');
            return FullChat;
        } catch (error) {
            console.log(error);
            throw new ApiError(
                httpCode.BAD_REQUEST,
                'failed to create chat'
            );
        }
    }
};

export const ChatService = { accessChat };
