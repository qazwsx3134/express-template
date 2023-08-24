import express, { Express } from "express"
import demoRouter from "./demo.js"

const router = express.Router()

router.get("/", (req, res, next)=>{

    res.send("indexccc")
})

export const routerList = (app:Express) => {
    app.use("/", router)
    app.use("/demo", demoRouter)
}