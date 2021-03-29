import { join } from "path"
import {existsSync, readFileSync} from 'fs'

import { LongException } from "../exception/error";
import { readFile } from "node:fs";
import { Console } from "console";


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

        const enrtyPoint = this.readConfigFile(this.config)
        process.exit()
    }

    private readConfigFile = (configPath:string):string => {
        const data = JSON.parse(readFileSync(configPath).toString())
        console.log(data)
        return "lol"
    }

    private configExists = (path:string):boolean => {
        try {
            return existsSync(path)
          } catch(err) {
        }
        return false
    }
}