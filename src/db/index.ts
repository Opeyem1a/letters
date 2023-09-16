import {drizzle} from "drizzle-orm/node-postgres";
import {Client} from "pg";
import {CONNECTION_STRING} from "@db/constants";


const client = new Client({
    connectionString: CONNECTION_STRING,
});

await client.connect();
export const db = drizzle(client);


export const getDb = async () => {
    const client = new Client({
        connectionString: CONNECTION_STRING,
    });

    await client.connect();
    return drizzle(client);
}