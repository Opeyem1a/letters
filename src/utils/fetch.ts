export const serverFetchData = async ({ endpoint }: { endpoint: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/${endpoint}`, {
        next: { revalidate: 3600 },
    })
    const data = await res.json()

    let errorMessage = "Failed to fetch data"
    if (!res.ok) {
        if (res.status === 400 || res.status === 404 || res.status === 500) {
            errorMessage = data["message"]
        } else throw new Error(errorMessage)

        return { data: null, error: errorMessage }
    }

    return { data, error: null }
}
