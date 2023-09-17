export default function ViewLetter({ params }: { params: { letter: string } }) {
    // onst [artist, albums] = await Promise.all([artistData, albumsData])

    return (
        <main>
            View specific letter by uuid Id of letter: {params.letter}
            {/*<p>TITLE: {LETTERS[params.letter].title}</p>*/}
            {/*<p>Content: {LETTERS[params.letter].content}</p>*/}
        </main>
    )
}
