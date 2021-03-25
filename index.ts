import { argv } from 'process'
import { readFile, existsSync } from 'fs'

import { LongException } from './exception/error'
import { LongLexicalAnalyser } from "./lexer"

const createLongLexer = (filename) => {
    const fileExists = existsSync(filename)
    if(!fileExists){
        const fileNotFound = new LongException(
            `Unable to find ${filename}`,
            "Check for typos",
            "FileNotFound"
        )
        return fileNotFound;
    }

    readFile(filename, (error: NodeJS.ErrnoException, data: Buffer) => {
        if(error){
            const exception = new LongException(
                "An Error occured while reading the file",
                "Recheck the filename",
                "ReadFile"
            )
            return exception
        } else {
            const fileReadData = data.toString()
            const lexer = new LongLexicalAnalyser(fileReadData)
        }

    })
}

class LongArgumentParser {
    private arguments:Array<string>
    private length:number;

    constructor(argument:Array<string>){
        this.arguments = argument.slice(2, argument.length)
        this.length = this.arguments.length
    }

    parseLongArguments = () => {
        if(this.length == 0){return null}
        else {
            if(this.arguments[0].endsWith(".long")){
                const coderunner = createLongLexer(this.arguments[0])
            }
        }
        return undefined
    }
}

const longArgumentParser = new LongArgumentParser(argv)
longArgumentParser.parseLongArguments()