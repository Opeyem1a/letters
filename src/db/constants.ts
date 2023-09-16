export const CONNECTION_STRING = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
export const CONNECTION_STRING_2 = `postgres://db_user:db_password@0.0.0.0:5432/letters_db`

export const conn = () => {
    return `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
}