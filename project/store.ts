import { join } from "path";
import {writeFileSync, existsSync} from 'fs'

export class LongProjectStore {
    private readonly projectName:string
    private projectDirectory:string

    constructor(name, directory){
        this.projectName = name;
        this.projectDirectory = directory
    }

    private checkFileExistence(filename:string):boolean {
        try{
            return existsSync(filename)
        } catch(eror){
            return false
        }
        return false
    }

    public storeProjectInformation = () => {
        const store = join(__dirname, "json", "store.json")
        if(!this.checkFileExistence(store)){
            writeFileSync(store, JSON.stringify({}))
        }
    }
}