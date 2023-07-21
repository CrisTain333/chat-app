import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { AuthService } from './service';
import config from '../../config';
import sendResponse from '../../shared/sendResponse';
import { IRefreshTokenResponse } from './interface';

const createUser = catchAsync(async (req: Request, res: Response) => {
    const { ...registerData } = req.body;
    const result = await AuthService.createUser(registerData);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User created successfully',
        data: result
    });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AuthService.login(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie

    const cookieOptions = {
        secure: config.NODE_ENV === 'production',
        httpOnly: true
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User login in successfully',
        data: others
    });
});

const refreshToken = catchAsync(
    async (req: Request, res: Response) => {
        const { refreshToken } = req.cookies;

        const result = await AuthService.refreshToken(refreshToken);

        // set refresh token into cookie

        const cookieOptions = {
            secure: config.NODE_ENV === 'production',
            httpOnly: true
        };

        res.cookie('refreshToken', refreshToken, cookieOptions);

        sendResponse<IRefreshTokenResponse>(res, {
            statusCode: 200,
            success: true,
            message: 'Access token changed',
            data: result
        });
    }
);

export const AuthController = {
    loginUser,
    refreshToken,
    createUser
};
