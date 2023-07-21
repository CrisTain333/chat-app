import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { TestService } from './service';
import sendResponse from '../../shared/sendResponse';
import { httpCode } from '../../shared/httpCodes';

const testController = catchAsync(
    async (req: Request, res: Response) => {
        const data = await TestService.testFunction();
        sendResponse(res, {
            success: true,
            statusCode: httpCode.OK,
            message: 'Server on Fire',
            data: data
        });
    }
);

export const TestController = { testController };
