import { Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { MessageService } from './service';

const addMessage = catchAsync(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (req: any, res: Response) => {
        const payload = req.body;
        const result = await MessageService.addMessage(
            payload
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: `Message added successfully`,
            data: result
        });
    }
);

export const MessageController = { addMessage };
