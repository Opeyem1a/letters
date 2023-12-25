import * as dotenv from "dotenv"
import { useEffect, useState } from "react"

dotenv.config()

export const useFetch = <T>(endpoint: string) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState<T | undefined>(undefined)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_HOST}/${endpoint}`, {
            next: { revalidate: 3600 },
        })
            .then(res => {
                if (!res.ok) setError(true)
                return res.json()
            })
            .then(data => {
                setData(data)
                setLoading(false)
            })
            .catch(err => {
                console.log(`Error in route [${endpoint}]`, err)
                throw new Error("Failed to fetch data")
            })
    }, [endpoint])

    return { data, loading, error }
}
