import {stdout, stdin, cwd} from 'process'
import {createInterface} from 'readline'
import {cyan} from 'chalk'
import {join} from 'path'
import {readdirSync, mkdir} from 'fs'
import { LongException } from '../exception/error'


const inputInterface = createInterface({
    input : stdin,
    output : stdout
})

export class LongProject {
    private projectName:string
    private projectDirectory:string
    
    constructor(name, directory){
        this.projectName = name
        this.projectDirectory = this.isValidDirectory(directory)

        console.log(this.projectDirectory)

    }

    public static createLongProject = () => {
        inputInterface.question(cyan("Project Name [?] "), (answer) => {
            if(answer == ""){answer = "."}
            const directory = answer == "." ? cwd():join(
                cwd(), answer
            )

            const project = new LongProject(answer, directory)
            inputInterface.close()
        })
    }

    private isValidDirectory = (directory:string):string => {
        if(!(cwd() == directory)){
            mkdir(directory, (error:NodeJS.ErrnoException) => {
                if(error) {
                    const exception = new LongException(
                        `${directory} exists`,
                        "Try another project name",
                        "ProjectError"
                    ).evokeLongException()
                }
            })
            return directory
        }
        let files = readdirSync(directory)
        if(files.length != 0){
            const exception = new LongException(
                "Folder not empty",
                "Try another project name",
                "DirectoryError"
            ).evokeLongException()
        } else {
            return directory
        }
    }

}