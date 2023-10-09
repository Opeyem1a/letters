import * as dotenv from "dotenv"

dotenv.config()

export const useFetch = async (endpoint: string) => {
    const res = await fetch(`${process.env.HOST}/${endpoint}`, {
        next: { revalidate: 3600 },
    })
    let data

    try {
        data = await res.json()
    } catch {
        throw new Error("Failed to fetch data")
    }

    if (res.status === 400 || res.status === 404 || res.status === 500) {
        return { error: data["message"] }
    }

    return { data: data }
}
