import { Request, Response, NextFunction } from "express"
import request, { ICustomAxiosResponse } from "../utils/axios.js"
import { getHttpResponse, handleErrorAsync } from "../utils/mixinTools.js"

export const demoController = {
    getDogs: handleErrorAsync(
        async (req:Request, res:Response, next:NextFunction)=>{
            const { target } = await request({
                url: "breeds/image/random",
                method: "get"
            }) as ICustomAxiosResponse
            res.status(200).json(getHttpResponse({
                data: target
            }))
        }
    )
}