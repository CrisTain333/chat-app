/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './service';
import sendResponse from '../../shared/sendResponse';

const getUser = catchAsync(async (req: any, res: Response) => {
    const user = req?.user;
    const result = await UserService.getUser(user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result
    });
});

const getAllUser = catchAsync(async (req: any, res: Response) => {
    const user = req?.user;
    const query: string = req?.query?.search;
    const result = await UserService.getAllUser(query, user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Users retrieved successfully',
        data: result
    });
});

export const UserController = { getUser, getAllUser };
