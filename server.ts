import express, { Request, Response } from 'express'
import { env as environment } from 'process'
import { urlencoded, json } from 'body-parser'
import { LongLexicalAnalyser } from './lexer'
import { LongCommand } from './command/command'

// The long express server
const longServer = express()
const longRouter = express.Router()

longServer.use(urlencoded({ extended: false }));
longServer.use(json());

// port
const port = environment.PORT || 3000

longRouter.get("/", (request:Request, response:Response) => {
    response.send(request.statusCode)
})

longRouter.post("/run", (request:Request, response:Response) => {
    const data = request.body
    if(!Object.keys(data).includes("code")){
        return response.status(404).send("Code not found");
    }

    const lexer = new LongLexicalAnalyser(data.code)
    const commands = new LongCommand(lexer.createLexicalAnalyser())

    return response.json({
        stdout : commands.outputList
    })
})

longServer.use("/", longRouter)

longServer.listen(port, () => {
    console.log(`App started at port ${port}`)
})