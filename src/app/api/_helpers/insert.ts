import { NewLetter } from "@db/schema/types"
import { db } from "@/db"
import { letters, lettersToTags } from "@db/schema"

export const insertLetter = async (letter: NewLetter) => {
    const { tagIds, ...letterSegment } = letter

    await db.transaction(async () => {
        const result = await db
            .insert(letters)
            .values(letterSegment)
            .returning({ letterId: letters.id })
        if (tagIds) {
            const tagRecordsToAdd = tagIds.map(tagId => ({
                letterId: result[0].letterId,
                tagId: tagId,
            }))
            await db.insert(lettersToTags).values(tagRecordsToAdd)
        }
    })
}
