/**
 * 注意 如果要import其他file
 * 需要遵守這樣的格式 import { xx } from "./xx.js"
 */

/* init basic express app */
import express, { Request, Response, NextFunction } from "express"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* require config */
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000

/* Routes */
import { routerList } from "./routes/index.js"
routerList(app)

/* Error Handling */
import { initUncaughtException, initUnhandledRejection } from "./utils/process.js"
import { appError, errorHandlerMainProcess } from "./utils/mixinTools.js"

initUncaughtException()
initUnhandledRejection()

app.use((req:Request, res:Response, next:NextFunction)=>{
    next(appError(404, "40401", "No Routes"))
})

app.use(errorHandlerMainProcess)

/* Display Port to assure all services are on. */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
})
