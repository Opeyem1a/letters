import {pgTable, serial, varchar} from "drizzle-orm/pg-core";


export const letters = pgTable("letters", {
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }),
});
// date
// author_age
// content - string
// coolWithSocialPosting - boolean

export const tags = pgTable('tags', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
});