import { letters } from "./index"

export type Letter = typeof letters.$inferSelect
export type MaybeLetter = typeof letters.$inferSelect | undefined
export type NewLetter = typeof letters.$inferInsert
