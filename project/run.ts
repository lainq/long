import { join } from "path"
import {existsSync, readFileSync} from 'fs'

import { LongException } from "../exception/error";
import { LongLexicalAnalyser } from '../lexer'
import { LongCommand } from '../command/command' 


export class LongApplication {
    private static readonly longConfigIdentifier = 'long.json';

    private readonly path:string
    private readonly config:string

    constructor(path:string){
        this.path = path
        this.config = join(this.path, LongApplication.longConfigIdentifier)

        if(!this.configExists(this.config)){
            const exception = new LongException(
                `Cannot find config file at ${this.config}`,
                'Try running the new command',
                'ConfigError'
            ).evokeLongException()
        }

        const entryPoint = this.readConfigFile(this.config)
        if(!this.configExists(entryPoint)){
            const exception = new LongException(
                'An Error occured while reading the file',
                'Recheck the filename',
                'ReadFile'
              ).evokeLongException()
        }
        
        this.runApplication(entryPoint)

        process.exit()
    }

    private runApplication = (path:string):void => {
        const data = readFileSync(path)
        const fileReadData = data.toString();
        const lexer = new LongLexicalAnalyser(fileReadData);
        const tokens = lexer.createLexicalAnalyser();

        const commands = new LongCommand(tokens);
    }

    private readConfigFile = (configPath:string):string => {
        const data = JSON.parse(readFileSync(configPath).toString())
        return data.main.toString()
    }

    private configExists = (path:string):boolean => {
        try {
            return existsSync(path)
          } catch(err) {
              return false
        }
        return false
    }
}