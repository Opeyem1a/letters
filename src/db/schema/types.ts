import { countries, letters, tags } from "./index"

export type Tag = typeof tags.$inferSelect
export type Country = typeof countries.$inferSelect
export type Letter = typeof letters.$inferSelect
export type MaybeLetter = typeof letters.$inferSelect | undefined

export type NewLetter = Omit<
    typeof letters.$inferInsert,
    "id" | "uuid" | "submittedAt" | "approved" | "published"
> & { tagIds?: number[] }

export type LetterLite = Omit<
    Letter,
    "mediaConsent" | "authorAge" | "content" | "approved"
> & {
    url: string
    tags: Tag[]
}

export type DetailedLetter = Omit<Letter, "countryId" | "approved"> & {
    country: Country
    tags: Tag[]
}
