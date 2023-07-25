/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './interface';
import { User } from './model';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';

const getUser = async (
    user: JwtPayload
): Promise<IUser | null> => {
    const { email } = user;
    const profile = await User.findOne({ email });
    if (!profile) {
        throw new ApiError(
            httpCode.NOT_FOUND,
            'User not found'
        );
    }

    const userWithoutPassword = await User.findById(
        profile._id
    ).select('-password');

    return userWithoutPassword;
};

const getAllUser = async (
    query: string,
    requestedUser: any
): Promise<IUser[] | null> => {
    if (!query) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'search query is required'
        );
    }
    const users = await User.find({
        $or: [
            {
                name: {
                    $regex: query,
                    $options: 'i'
                }
            }
        ]
    })
        .find({
            _id: { $ne: requestedUser._id }
        })
        .select('-password');
    return users;
};

export const UserService = {
    getUser,
    getAllUser
};
