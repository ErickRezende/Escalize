import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from '../routes/index.js'
import dbConnection from '../lib/dbConection.js'

dotenv.config()

async function server() {
    const dbConection = await dbConnection()

    if(!dbConection.sucess){
        return {sucess: false, error: `Error to connect to MongoDB: ${dbConection.error}`}
    }

    const app = express()
    const PORT = process.env.PORT

    app.use(cors())
    app.use(express.json())

    app.get("/", (req, res) => {
        res.status(200).send("Server is running!")
    })

    routes(app)

    app.listen(PORT, () => console.log(`Server running http://127.0.0.1:${PORT}/ ....\n`))

    return {sucess: true}
}

const _server = server()

if(!_server.sucess){
    console.error(_server.error, _server.sucess)
}

