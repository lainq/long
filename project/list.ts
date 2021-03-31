import { yellow } from "chalk";
import { readFileSync, existsSync, writeFileSync } from "fs";
import { join } from "path";


export class LongProjectList {
    private readonly store:string;

    constructor() {
        this.store = join(__dirname, "json", "store.json")
        const storeExists = this.checkFileExistence(this.store)

        if(!storeExists){
            console.log(yellow("It seems like you haven't created any project"))
            process.exit()
        }

        const data = readFileSync(this.store).toString()
        if(!this.convertToJson(data)){
            writeFileSync(
                this.store,
                JSON.stringify({
                  projects: [],
                })
            );
        }
        const project = JSON.parse(data).projects
        this.throwProjectList(project)
        process.exit()
    }

    private throwProjectList = (project:Array<Object>):boolean => {
        for(let projectIndex=0; projectIndex<project.length; projectIndex++){
            console.log(project)
        }
        return true
    }

    private convertToJson = (data:string):boolean => {
          try {
            let json = JSON.parse(data);
            return true;
          } catch (error) {
            return false;
          }
    }

    private checkFileExistence = (filepath:string):boolean => {
        try {
            return existsSync(filepath)
        } catch(error){
            return false
        }
        return false
    }
}