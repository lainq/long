import { argv } from 'process'

class LongArgumentParser {
    private arguments:Array<string>
    private length:number;

    constructor(argument:Array<string>){
        this.arguments = argument
        this.length = this.arguments.length
    }

    parseLongArguments = () => {
        if(this.length == 0){return null}
    }
}