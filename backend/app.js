import dotenv from "dotenv"
import bodyParser from "body-parser"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import cors from "cors"
import { dbConfig } from "./db/dbConfig.js"
import UserRouter from "./routes/user.route.js"
import BlogRouter from "./routes/blog.route.js"
dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const staticPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'public')
app.use(express.static(staticPath))

app.use("/user", UserRouter)
app.use("/blog", BlogRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is running : ${process.env.PORT}`)
})