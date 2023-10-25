import { useCallback } from "react"
import * as dotenv from "dotenv"

dotenv.config()

type PostParams = {
    endpoint: string
}

export const usePost = ({ endpoint }: PostParams) => {
    const asyncFunc = useCallback(
        async (body: BodyInit) => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_HOST}/${endpoint}`,
                {
                    method: "POST",
                    body,
                    // @ts-expect-error
                    next: { revalidate: null },
                }
            )

            let data

            try {
                data = await res.json()
            } catch {
                throw new Error("Failed to fetch data")
            }

            if (
                res.status === 400 ||
                res.status === 404 ||
                res.status === 500
            ) {
                return { error: data["message"] }
            }

            return { data: data }
        },
        [endpoint]
    )

    return {
        asyncFunc,
    }
}
