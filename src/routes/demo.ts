import express from "express"
import { demoController } from "../controller/demo.js"

const router = express.Router()

router.get("/dogs", (req, res, next)=>{
    demoController.getDogs(req, res, next)
})

export default router