import express, {Express, Request, Response} from 'express'
import dotenv from 'dotenv'
dotenv.config()
import sequelize from './db'
// console.log(models)
import cors from 'cors'

const PORT = process.env.PORT || 5000

export const app: Express = express()
app.use(cors()) // передаем cors() в app
app.use(express.json()) // включаем json для обработки json в express

app.get('/', async (req: Request, res: Response): Promise<Response> => {
    // res.status(200).json({ message: 'WORKING!' })
    return res
        .status(200)
        .send({ message: `Welcome to the cookbook API! \n Endpoints available at http://localhost:${PORT}/api/v1` })
})

const start = async () => {
    try {
        await sequelize.authenticate() // подключаемся к БД
        await sequelize.sync() // сверяем состояние БД со схемой данных

        // listening port
        app.listen(PORT, () =>
            console.log(
                `⚡️[server]: Server is running at http://localhost:${PORT}`
            )
        )
    } catch (e) {
        console.log(e)
    }
}

start()
