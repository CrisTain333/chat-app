import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './interface';
import { User } from './model';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';

const getUser = async (user: JwtPayload): Promise<IUser | null> => {
    const { email } = user;
    const profile = await User.findOne({ email });
    if (!profile) {
        throw new ApiError(httpCode.NOT_FOUND, 'User not found');
    }

    const userWithoutPassword = await User.findById(
        profile._id
    ).select('-password');

    return userWithoutPassword;
};

export const UserService = {
    getUser
};
