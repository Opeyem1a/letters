import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres"
import pg from "pg"
import * as schema from "./schema/index"
import * as dotenv from "dotenv"

dotenv.config()

const { Client } = pg

const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
})

await client.connect()

export const db: NodePgDatabase<typeof schema> = drizzle(client, { schema })
