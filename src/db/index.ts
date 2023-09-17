import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import { Client } from "pg"
import * as schema from "./schema/index"

let db: NodePgDatabase<typeof schema>

export const drizzleDb = async () => {
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    })

    await client.connect()
    return drizzle(client, { schema })
}

export const getDb = async (): Promise<NodePgDatabase<typeof schema>> => {
    if (db) return db
    return await drizzleDb()
}
