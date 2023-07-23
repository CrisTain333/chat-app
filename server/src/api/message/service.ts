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
        // res.status(200).json(result);
        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'failed to send message'
        );
    }
};

export const MessageService = {
    addMessage
};
