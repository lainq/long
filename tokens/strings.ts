import { setCurrentCharacter } from "./token"

export class LongString {
    private data:string
    private pos:number

    /**
     * @constructor
     * 
     * @param data The data inside of the file
     * @param pos The position of the lexer in the data
     */

    constructor(data, pos){
        this.data = data
        this.pos = pos
    }

    public createLongString = ():any => {
        let character:string = setCurrentCharacter(this.data, this.pos)
        let string:string = ""
        let quotationCount = 0

        while(character != null) {

            if(character == '"'){
                quotationCount += 1
                if(quotationCount > 2){
                    break
                }
            }

            string += character.toString()
            console.log(quotationCount)
            this.pos += 1
            character = setCurrentCharacter(this.data, this.pos)
        }

        return {
            data : string,
            pos : this.pos
        }
    }

}