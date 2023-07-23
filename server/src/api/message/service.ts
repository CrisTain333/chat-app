import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { IMessage } from './interface';
import { Message } from './model';

const addMessage = async (payload: IMessage) => {
    const { chatId, senderId, text } = payload;
    const message = new Message({
        chatId,
        senderId,
        text
    });
    try {
        const result = await message.save();

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'failed to send message'
        );
    }
};

const getMessages = async (chatId: string) => {
    try {
        const result = await Message.find({ chatId });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to get messages'
        );
    }
};

export const MessageService = {
    addMessage,
    getMessages
};
