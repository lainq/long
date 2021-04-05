import express, { Request, Response } from 'express'

// The long express server
const longServer = express()

longServer.get("/", (request:Request, response:Response) => {
    response.send(request.statusCode)
})