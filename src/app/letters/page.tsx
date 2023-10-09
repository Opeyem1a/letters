import { LetterLite } from "@db/schema/types"
import { useFetch } from "@/hooks/useFetch"
import { getLetterLink } from "@/app/_util/letter"
import Link from "next/link"

export const ViewAllLetters = async () => {
    const { data, error } = await useFetch(`api/letters`)

    if (error) {
        return <p>{error}</p>
    }
    const letters: LetterLite[] = data

    return (
        <main>
            {letters.length}
            <ul>
                {letters.map((letter, index) => (
                    <li key={`letter-${index}`}>
                        <h1>{letter.title}</h1>
                        <p>{String(letter.submittedAt)}</p>
                        <Link href={letter.url}>See letter</Link>
                        <p>{letter.uuid}</p>
                        <p>{letter.countryId}</p>
                        <ul>
                            {letter.tags.map((tag, idx) => (
                                <li key={`letter-${index}-tag-${idx}`}>
                                    {tag.name}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default ViewAllLetters
