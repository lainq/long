import { argv } from 'process'
import { readFile, existsSync } from 'fs'

import { LongException } from './exception/error'
import { LongLexicalAnalyser } from "./lexer"

/**
 * 
 * @param {string} filename The name of the file
 *  
 * Checks if the file exists, if yes, raed the file,
 * else, throw a LongException and also create a new
 * lexer object after reading the file
 * 
 * @returns {undefined | LongException} undefine dor an error message
 */
const createLongLexer = (filename:string) => {
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

    /**
     * @constructor
     * @param {string[]} argument The command line arguments to parse
     */
    constructor(argument:Array<string>){
        this.arguments = argument.slice(2, argument.length)
        this.length = this.arguments.length
    }

    /**
     * @public
     *  
     * If there are no arguments, return undefined
     * else,if the first argument ends with long(.long)
     * file extension, read the file and create a lexer
     * 
     * @returns {undefined} 
     */
    public parseLongArguments = () => {
        if(this.length == 0){return undefined}
        else {
            if(this.arguments[0].endsWith(".long")){
                const coderunner = createLongLexer(this.arguments[0])
            }
        }
        return undefined
    }
}

// The argument parser
const longArgumentParser = new LongArgumentParser(argv)
longArgumentParser.parseLongArguments()