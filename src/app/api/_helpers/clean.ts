import { NewLetter } from "@db/schema/types"

export const cleanLetter = async (_letter: NewLetter): Promise<NewLetter> => {
    if (!_letter.title) throw Error("Letter must have a title to be submitted.")
    if (!_letter.content)
        throw Error("Letter must have content to be submitted.")

    // @ts-expect-error
    if(_letter["published"] || _letter["approved"])
        throw Error("New letters cannot be created as pre-approved or pre-published.")

    const { tagIds, ...rest } = _letter
    if (Array.isArray(tagIds) && tagIds.length === 0) return rest
    if (!tagIds) return rest

    return _letter
}
