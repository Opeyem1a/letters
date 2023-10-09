import { NextResponse } from "next/server"

export const errorResponse = (
    status: number,
    message: string,
    originalError?: Object
) => {
    return NextResponse.json(
        {
            message,
            originalError: {
                _text: String(originalError),
                ...originalError,
            },
            error: true,
        },
        { status }
    )
}

export const DrizzleErrors = {
    BAD_UUID: "22P02",
    FK_ERROR: "23503",
}
