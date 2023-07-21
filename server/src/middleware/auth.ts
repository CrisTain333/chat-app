/* eslint-disable @typescript-eslint/no-explicit-any */
import { Secret } from 'jsonwebtoken';
import config from '../config';
import { jwtHelpers } from '../utils/helper/jwtHelpers';
import ApiError from '../error/ApiError';
import { NextFunction, Response } from 'express';

const auth =
    () => async (req: any, res: Response, next: NextFunction) => {
        try {
            //get authorization token
            const token = req.headers.authorization;
            if (!token) {
                throw new ApiError(401, 'You are not authorized');
            }
            // verify token
            let verifiedUser = null;

            verifiedUser = jwtHelpers.verifyToken(
                token,
                config.jwt.secret as Secret
            );
            req.user = verifiedUser;
            next();
        } catch (error) {
            next(error);
        }
    };

export default auth;
