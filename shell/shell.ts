import { yellow } from 'chalk'
import { stdout, stdin } from 'process'
import { createInterface, Interface } from 'readline'

export class LongShell {
    private readlineInterface:Interface

    constructor(){
        this.readlineInterface = createInterface({
            input : stdin,
            output : stdout
        })

        this.createShellPrompt(this.readlineInterface)
    }

    public createShellPrompt = (readlineInterface:Interface):void => {
        readlineInterface.question(">>>" , (command) => {
            if(command == ".exit"){
                readlineInterface.close()
            }
            this.createShellPrompt(readlineInterface)
        })
    }
}