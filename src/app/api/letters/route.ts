import { errorResponse } from "@/utils/api"
import { Letter, LetterLite } from "@db/schema/types"
import { db } from "@/db"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const _letters: Letter[] = await db.query["letters"].findMany({
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
            url: `/letter/${letter.uuid}`,
        }))
        return NextResponse.json(letters)
    } catch (e) {
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later."
        )
    }
}
