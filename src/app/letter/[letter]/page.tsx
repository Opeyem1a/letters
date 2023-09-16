export default function ViewLetter({params}: { params: { letter: string } }) {
    return (
        <main>
            View specific letter by id

            Id of letter: {params.letter}

            {/*<p>TITLE: {LETTERS[params.letter].title}</p>*/}
            {/*<p>Content: {LETTERS[params.letter].content}</p>*/}
        </main>
    )
}
