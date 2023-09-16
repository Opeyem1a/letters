import {Config} from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config();

export default {
    schema: "./src/db/schema.ts",
    out: "./src/db/migrations/",
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.CONNECTION_STRING || "",
    }
} satisfies Config;