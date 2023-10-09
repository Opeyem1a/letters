import { countries, letters, tags } from "./index"

export type Tag = typeof tags.$inferSelect
export type Country = typeof countries.$inferSelect
export type Letter = typeof letters.$inferSelect
export type MaybeLetter = typeof letters.$inferSelect | undefined

export type NewLetter = Omit<
    typeof letters.$inferInsert,
    "id" | "uuid" | "submittedAt"
> & { tagIds?: number[] }

export type LetterLite = Omit<
    Letter,
    "mediaConsent" | "authorAge" | "content"
> & {
    url: string
    tags: Tag[]
}

export type DetailedLetter = Omit<Letter, "countryId"> & {
    country: Country
    tags: Tag[]
}
