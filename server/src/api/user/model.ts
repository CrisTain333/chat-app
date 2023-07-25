import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser, UserModel } from './interface';
import config from '../../config';
const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users'
            }
        ],

        password: { type: String, required: true },
        profilePicture: String
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.bcrypt_salt_rounds)
    );
    next();
});

export const User = model<IUser, UserModel>(
    'Users',
    userSchema
);
