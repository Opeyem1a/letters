import { countries, letters } from "./index"

export type Country = typeof countries.$inferSelect
export type Letter = typeof letters.$inferSelect
export type MaybeLetter = typeof letters.$inferSelect | undefined

export type NewLetter = Omit<
    typeof letters.$inferInsert,
    "id" | "uuid" | "submittedAt"
> & { tagIds?: number[] }

export type LetterLite = Letter & {
    url: string
}

export type DetailedLetter = Omit<Letter, "countryId"> & {
    country: Country
    tags: { tag: { name: string } }[]
}
