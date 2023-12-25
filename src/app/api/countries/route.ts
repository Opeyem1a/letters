import { Country } from "@db/schema/types"
import { db } from "@/db"
import { errorResponse } from "@/utils/api"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const countries: Country[] = await db.query["countries"].findMany({
            columns: {
                id: true,
                name: true,
                code: true,
            },
        })
        return NextResponse.json(countries)
    } catch (e) {
        return errorResponse(
            500,
            "Unknown error occurred. Please try again later."
        )
    }
}
