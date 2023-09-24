import { NextResponse } from "next/server"

export const errorResponse = (status: number, message: string, type?: string) => {
    // @ts-ignore
    return NextResponse.json({ message, type, error: true }, { status })
}

export const DrizzleErrors = {
    BAD_UUID: "22P02",
}
