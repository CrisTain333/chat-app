import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { jwtHelpers } from '../../utils/helper/jwtHelpers';
import { User } from '../user/model';
import { ILoginUser, IRefreshTokenResponse } from './interface';
import bcrypt from 'bcrypt';
import { IUser } from '../user/interface';

const createUser = async (user: IUser): Promise<IUser | null> => {
    const { name, email, password } = user;

    //Check the email exist in database or not ;
    const isExits = await User.findOne({ email: email });

    if (isExits) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Email already exists'
        );
    }
    // now create the user;
    const newUser = await User.create({
        name,
        email,
        password
    });

    const userWithoutPassword = await User.findById(
        newUser._id
    ).select('-password');

    return userWithoutPassword;
};

const login = async (payload: ILoginUser) => {
    const { email: userEmail, password } = payload;
    const isUserExist = await User.findOne({ email: userEmail });

    // check the email exist
    if (!isUserExist) {
        throw new ApiError(httpCode.NOT_FOUND, 'User does not exist');
    }

    // check the password
    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist?.password
    );

    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError(
            httpCode.UNAUTHORIZED,
            'Invalid credentials'
        );
    }
    const { name, email } = isUserExist;

    // if matched created
    const accessToken = jwtHelpers.createToken(
        { name, email },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );
    const refreshToken = jwtHelpers.createToken(
        { name, email },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken
    };
};

const refreshToken = async (
    token: string
): Promise<IRefreshTokenResponse> => {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_secret as Secret
        );
    } catch (err) {
        throw new ApiError(403, 'Invalid Refresh Token');
    }

    const { email } = verifiedToken;

    // tumi delete hye gso  kintu tumar refresh token ase
    // checking deleted user's refresh token

    const isUserExist = await User.findOne({ email });
    if (!isUserExist) {
        throw new ApiError(404, 'User does not exist');
    }
    //generate new token

    const newAccessToken = jwtHelpers.createToken(
        {
            email: isUserExist.email,
            name: isUserExist.name
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken
    };
};

export const AuthService = { createUser, login, refreshToken };
