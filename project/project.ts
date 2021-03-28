import {stdout, stdin} from 'process'
import {createInterface} from 'readline'

const inputInterface = createInterface({
    input : stdin,
    output : stdout
})

export class LongProject {
    private projectName:string
    private projectDirectory:string
    
    constructor(name, directory){
        this.projectName = name
        this.projectDirectory = directory
    }
}