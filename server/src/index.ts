import Express from 'express'
import dotenv from 'dotenv'

dotenv.config()

export const app = Express()
app.use(Express.json())

const PORT = process.env.PORT || 5000
const start = () => {
    try {
        // listening port
        app.listen(PORT, () =>
            console.log(
                `Server is running on ${PORT}`
            )
        )
    } catch (e) {
        console.log(e)
    }
}

start()
