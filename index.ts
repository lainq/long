import { argv } from 'process'
import { readFile, existsSync } from 'fs'
import { LongException } from './exception/error'

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