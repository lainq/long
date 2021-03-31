import { cyan, yellow } from 'chalk'
import { createInterface, Interface } from 'readline'
import { stdin, stdout } from 'process'

export class LongShell {
    private readlineInterface:Interface

    constructor() {
        this.readlineInterface = createInterface({
            input : stdin,
            output : stdout
        })

        this.createLongShell(this.readlineInterface)
        process.exit()
    }

    public createLongShell = (readlineInterface:Interface):void => {]\
        readlineInterface.question(cyan("long >>>"), (command) => {
            
        })
    }
}