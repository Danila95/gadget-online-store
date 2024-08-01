import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const dbName: string | undefined = process.env.DB_NAME
const dbUser: string | undefined = process.env.DB_USER
const dbHost: string | undefined = process.env.DB_HOST
const dbPort: string | undefined = process.env.DB_PORT
const dbDriver: string | undefined = process.env.DB_DRIVER
const dbPassword: string | undefined = process.env.DB_PASSWORD

if (!dbName || !dbUser || !dbPassword || !dbHost || !dbPort) {
    throw new Error("Some required database environment variables are missing.");
}

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect: 'postgres',
    host: dbHost,
    port: Number(dbPort)
})

export default sequelize
