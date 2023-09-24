import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema/index"

const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
})

await client.connect()

export const db: NodePgDatabase<typeof schema> = drizzle(client, { schema })
