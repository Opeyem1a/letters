import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";


const client = new Client({
    connectionString: process.env.CONNECTION_STRING,
});

await client.connect();
export const db = drizzle(client);


export const getDb = async () => {
    const client = new Client({
        connectionString: process.env.CONNECTION_STRING,
    });

    await client.connect();
    return drizzle(client);
}