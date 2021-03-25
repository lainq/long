/**
 * The position or the index in the
 * string data read from the specified
 * filename
 * 
 * Contains a position(which is the index),
 * and a tail[boolean] (end of the file or not)
 */
interface Position {
    position : number
    tail : boolean
}

/**
 * @param {String} fileData The data in the file
 * @param {Position} position The current position of the lexer 
 * in the whole string
 * @param {String | null} character The current character
 */
export class LongLexicalAnalyser {
    private readonly fileData:string
    private position:Position
    private character:string | null

    constructor(fileData){
        this.fileData = fileData.toString();
        this.position = {position:0, tail:false}
        this.character = this.setCurrentCharacter()

        console.log(this.character)
    }

    setCurrentCharacter = ():string | null => {
        if(this.position.position == this.fileData.length){
            this.position.tail = true
            return null;
        } else {
            return this.fileData[this.position.position]
        }
    }
}