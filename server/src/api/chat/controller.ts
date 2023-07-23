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

export const ChatController = { accessChat };
