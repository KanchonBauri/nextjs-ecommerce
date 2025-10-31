import { NextResponse } from "next/server";


export const response = (success, statusCode, message, data = {}) => {
    return NextResponse.json({
        success,
        statusCode,
        message,
        data
    });
}

export const catchError = (error, customMessage) => {
    // handle duplicate key error 
    if (error.code && error.code === 11000) {
        const field = Object.keys(error.keyPattern).join(', ');
        error.message = `Duplicate fileds: ${field}. These fields must be unique.`;
    }

    let errorObj = {}

    if (process.env.NODE_ENV === 'development') {
        errorObj = {
            message: error.message,
            stack: error.stack,
            ...error
        }
    } else {
        errorObj = {
            message: customMessage || 'Internal server error.',
        }
    }
return response(false, error.code, ...errorObj);
}