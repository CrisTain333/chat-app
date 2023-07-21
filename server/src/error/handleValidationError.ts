import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interface/error';
import { IGenericErrorResponse } from '../interface/common';

const handleValidationError = (
    err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = Object.values(
        err.errors
    ).map(
        (
            element:
                | mongoose.Error.ValidatorError
                | mongoose.Error.CastError
        ) => {
            return {
                path: element?.path,
                message: element?.message
            };
        }
    );

    return {
        statusCode: 400,
        message: 'Validation Error',
        errorMessages: errors
    };
};

export default handleValidationError;
