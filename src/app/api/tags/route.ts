import { Tag } from "@db/schema/types"
import { db } from "@/db"
import { errorResponse } from "@/utils/api"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const tags: Tag[] = await db.query["tags"].findMany({
            columns: {
                id: true,
                name: true,
            },
        })
        return NextResponse.json(tags)
    } catch (e) {
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later."
        )
    }
}
