import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { letters } from "@db/schema"
import { MaybeLetter, NewLetter } from "@db/schema/types"
import { DrizzleErrors, errorResponse } from "@/utils/api"

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const uuid = searchParams.get("uuid")

    if (uuid === null) {
        return errorResponse(404, "No letter UUID provided.")
    }

    try {
        const letter: MaybeLetter = await db.query["letters"].findFirst({
            where: eq(letters.uuid, uuid),
            with: {
                tags: {
                    columns: {
                        tagId: false,
                        letterId: false,
                    },
                    with: {
                        tag: {
                            columns: {
                                id: false,
                                name: true,
                            },
                        },
                    },
                },
                country: true,
            },
        })
        if (!letter) {
            return errorResponse(
                404,
                `Letter with UUID: ${uuid} could not be found.`
            )
        }
        return NextResponse.json(letter)
    } catch (e) {
        if (e.code === DrizzleErrors.BAD_UUID) {
            return errorResponse(500, "Malformed UUID.")
        }
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later."
        )
    }
}

export const POST = async (request: Request) => {
    const body = await request.json()

    if (!body) {
        return errorResponse(404, "No letter data provided.")
    }

    try {
        // todo: add validation for form data
        //@ts-expect-error
        const letter: MaybeLetter = await db
            .insert(letters)
            .values(body as NewLetter)
        return NextResponse.json(letter)
    } catch (e) {
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later." + e
        )
    }
}
