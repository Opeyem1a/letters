import { NextResponse } from "next/server"
import { db } from "@/db"
import { eq } from "drizzle-orm"
import { letters } from "@db/schema"
import { MaybeLetter } from "@db/schema/types"
import { DrizzleErrors, errorResponse } from "@/utils/api"

type ViewLetterParams = { params: { uuid: string } }

export const GET = async (request: Request, { params }: ViewLetterParams) => {
    const uuid = params.uuid

    try {
        //@ts-expect-error
        const letter: MaybeLetter = await db.query["letters"].findFirst({
            where: eq(letters.uuid, uuid),
            columns: {
                countryId: false,
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
                country: {
                    columns: {
                        name: true,
                        code: true,
                    },
                },
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
        //@ts-expect-error
        if (e.code === DrizzleErrors.BAD_UUID) {
            return errorResponse(500, "Malformed UUID.")
        }
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later."
        )
    }
}
