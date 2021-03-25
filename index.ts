import { argv } from 'process'
import { readFile, existsSync } from 'fs'

const createLongLexer = (filename) => {
    const fileExists = existsSync(filename)
    if(!fileExists){
        return null;
    }
}

class LongArgumentParser {
    private arguments:Array<string>
    private length:number;

    constructor(argument:Array<string>){
        this.arguments = argument
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