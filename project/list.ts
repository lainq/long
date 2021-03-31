import { existsSync } from "node:fs";
import { join } from "path";


export class LongProjectList {
    private readonly store:string;

    constructor() {
        this.store = join(__dirname, "json", "store.json")

        const storeExists = this.checkFileExistence(this.store)
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