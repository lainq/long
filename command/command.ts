import {LongException} from '../exception/error'
import {Token} from '../tokens/token'
import {Position} from '../lexer'

export class LongCommand {
    private readonly commandList:Array<Array<Token>>;
    private position:Position;

    constructor(commands:Array<Array<Token>>){
        this.commandList = commands
        this.position = {
            position : 0,
            tail : this.commandList.length == 0
        }

        console.log(this.commandList)
    }
}