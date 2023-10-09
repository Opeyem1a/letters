import {
    boolean,
    date,
    integer,
    pgTable,
    primaryKey,
    serial,
    text,
    uuid,
    varchar,
} from "drizzle-orm/pg-core"
import { AnyTable, relations, sql } from "drizzle-orm"

type RefTable = AnyTable<{ name: string }>

export const letters = pgTable("letters", {
    id: serial("id").primaryKey(),
    uuid: uuid("uuid").notNull().unique().defaultRandom(),
    title: varchar("title", { length: 255 }).notNull(),
    submittedAt: date("submitted_at", { mode: "date" })
        .notNull()
        .default(sql`CURRENT_TIMESTAMP`),
    authorAge: integer("author_age").notNull(),
    content: text("content").notNull(),
    mediaConsent: boolean("media_consent").notNull().default(false),
    countryId: integer("country_id")
        .notNull()
        .references(() => countries.id),
})

export const lettersRelations = relations(
    letters as RefTable,
    ({ one, many }) => ({
        tags: many(lettersToTags),
        country: one(countries, {
            fields: [letters.countryId],
            references: [countries.id],
        }),
    })
)

export const tags = pgTable("tags", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
})

export const tagsRelations = relations(tags as RefTable, ({ many }) => ({
    letters: many(lettersToTags),
}))

export const countries = pgTable("countries", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    code: varchar("code", { length: 5 }).unique().notNull(),
})

export const countriesRelations = relations(
    countries as RefTable,
    ({ many }) => ({
        letters: many(letters),
    })
)

// Many-to-many: Letters <-> Tags
export const lettersToTags = pgTable(
    "letters_to_tags",
    {
        letterId: integer("letter_id")
            .notNull()
            .references(() => letters.id),
        tagId: integer("tag_id")
            .notNull()
            .references(() => tags.id),
    },
    t => ({
        pk: primaryKey(t.letterId, t.tagId),
    })
)

export const lettersToTagsRelations = relations(
    lettersToTags as RefTable,
    ({ one }) => ({
        letter: one(letters, {
            fields: [lettersToTags.letterId],
            references: [letters.id],
        }),
        tag: one(tags, {
            fields: [lettersToTags.tagId],
            references: [tags.id],
        }),
    })
)
