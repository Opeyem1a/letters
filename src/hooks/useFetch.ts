export const useFetch = async (endpoint: string) => {
    const res = await fetch(endpoint)
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
