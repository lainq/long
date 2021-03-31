import { join } from "path";
import {writeFileSync, existsSync, readFileSync, mkdirSync} from 'fs'


import { LongException } from '../exception/error'

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
        if(!this.checkFileExistence(join(__dirname, "json"))){
            mkdirSync(join(__dirname, "json"))
        }

        if(!this.checkFileExistence(store) || !this.isFileEmpty(store)){
            writeFileSync(store, JSON.stringify({
                projects : []
            }))
        }
        
        let data = JSON.parse(readFileSync(store).toString())
        if(!Object.keys(data).includes("projects")){
            const exception = new LongException(
                "Process aborted due to an internal error",
                "Try creating a new project",
                "InternalError"
            ).evokeLongException()
        }

        data.projects.push({
            name : this.projectName,
            path : this.projectDirectory,
            created : this.createdAt(new Date())
        })
        console.log(data)

    }

    private createdAt = (date:Date):string => {
        let dateString = ""
        let values = [
            date.getDate(),
            date.getMonth(),
            date.getFullYear()
        ]
        for(let dateIndex=0; dateIndex<values.length; dateIndex++){
            dateString += values[dateIndex]
            if(dateIndex != (values.length - 1)){
                dateString += "-"
            }
        }
        return dateString
    }

    private isFileEmpty = (path:string):boolean => {
        if(!this.checkFileExistence(path)){
            return false
        }
        const data = readFileSync(path).toString()
        try{
            let json = JSON.parse(data)
            return true
        } catch(error) {
            return false
        }
    }
}