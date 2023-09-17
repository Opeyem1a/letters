import { NextResponse } from "next/server"
import { getDb } from "@/db"
import { eq } from "drizzle-orm"
import { letters } from "@db/schema"
import { MaybeLetter } from "@db/schema/types"

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url)
    const uuid = searchParams.get("uuid")

    if (uuid === null) {
        return NextResponse.json({ oof: true })
    }

    const db = await getDb()
    const letter: MaybeLetter = await db.query["letters"].findFirst({
        where: eq(letters.uuid, uuid),
        with: {
            lettersToTags: {
                columns: {
                    letterId: false,
                },
                with: {
                    tag: true,
                },
            },
            country: true,
        },
    })

    return NextResponse.json(letter)
}
