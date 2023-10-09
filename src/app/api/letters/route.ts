import { DrizzleErrors, errorResponse } from "@/utils/api"
import { LetterLite, NewLetter } from "@db/schema/types"
import { db } from "@/db"
import { NextResponse } from "next/server"
import { insertLetter } from "@/app/api/_helpers/insert"
import { cleanLetter } from "@/app/api/_helpers/clean"

export const GET = async () => {
    try {
        //@ts-expect-error
        const _letters: LetterLite[] = await db.query["letters"].findMany({
            columns: {
                mediaConsent: false,
                content: false,
                authorAge: false,
            },
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
            },
        })
        const letters: LetterLite[] = _letters.map(letter => ({
            ...letter,
            url: `/letters/${letter.uuid}`,
        }))
        return NextResponse.json(letters)
    } catch (e) {
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later."
        )
    }
}

export const POST = async (request: Request) => {
    const rawLetterData = await request.json()

    if (!rawLetterData) {
        return errorResponse(404, "No letter data provided.")
    }

    try {
        const cleanedLetterData = await cleanLetter(rawLetterData)
        await insertLetter(cleanedLetterData as NewLetter)
        return NextResponse.json({
            message: "Successfully saved new letter!",
        })
    } catch (error) {
        //@ts-expect-error
        if (error.code === DrizzleErrors.FK_ERROR) {
            return errorResponse(
                400,
                //@ts-expect-error
                `Invalid foreign key. ${error.detail ?? ""}`,
                error as Object
            )
        }
        return errorResponse(
            500,
            `Unknown error occurred. Please try again later.`,
            error as Object
        )
    }
}
