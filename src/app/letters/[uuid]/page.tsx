import { DetailedLetter } from "@db/schema/types"
import { serverFetchData } from "@/utils/fetch"

export const ViewLetter = async ({ params }: { params: { uuid: string } }) => {
    const { data, error } = await serverFetchData({
        endpoint: `api/letters/${params.uuid}`,
    })

    if (error) {
        return <p>{error}</p>
    }
    const letter: DetailedLetter = data

    return (
        <main>
            View specific letter by uuid Id of letter: {params.uuid}
            <h1>{letter.title}</h1>
            <ul>
                <li>Submitted At: {String(letter.submittedAt)}</li>
                <li>Media Consent: {String(letter.mediaConsent)}</li>
                <li>Age: {letter.authorAge}</li>
                <li>Country: {letter.country.name}</li>
                <li>Content: {letter.content}</li>
            </ul>
            <ul>
                Tags:
                {letter.tags.map((tag, index) => {
                    return <li key={index}>{tag.name}</li>
                })}
            </ul>
        </main>
    )
}

export default ViewLetter
