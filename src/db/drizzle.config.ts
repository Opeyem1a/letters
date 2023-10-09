import { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config()

export default {
    schema: "./src/db/schema/",
    out: "./src/db/migrations/",
    driver: "pg",
    dbCredentials: {
        connectionString: process.env.CONNECTION_STRING || "",
    },
    // Print all statements
    verbose: true,
    // Always ask for my confirmation
    strict: true,
} satisfies Config
