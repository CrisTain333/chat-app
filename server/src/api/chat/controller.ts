import { Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ChatService } from './service';

const accessChat = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (req: any, res: Response) => {
        const payload = req.body;
        const result = await ChatService.createChat(
            payload
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Chat created successfully',
            data: result
        });
    }
);

const getUserChats = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (req: any, res: Response) => {
        const userId = req.params.id;
        const result = await ChatService.getChats(userId);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `Chat's retrieved successfully`,
            data: result
        });
    }
);
const findUserChats = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (req: any, res: Response) => {
        const result = await ChatService.findChat(req);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `Chat retrieved successfully`,
            data: result
        });
    }
);

export const ChatController = {
    accessChat,
    getUserChats,
    findUserChats
};
