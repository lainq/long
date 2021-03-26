import { TokenAnalyse } from "../lexer"
import { LongException } from '../exception/error'

export class LongNumber {
    private position:number
    private data:string

    constructor(token:TokenAnalyse){
        this.position = token.position
        this.data = token.data
    }

    public createNumberToken = () => {
        let character = this.setCurrentCharacter()
        let numberString = ""
        let dotCount = 0

        while(character != null && (Number.isInteger(parseInt(character)) || character == ".")){
            if(character == "."){
                dotCount += 1
                if(dotCount > 1){
                    const exception = new LongException(
                        "Number cannot contain more than 1 decimal point",
                        "Enter a valid number",
                        "DecimalError"
                    ).evokeLongException()
                    process.exit(1)
                }
            }

            numberString += character.toString()

            this.position += 1
            character = this.setCurrentCharacter()
        }
        return {
            number : numberString,
            position : this.position
        }
    }

    public setCurrentCharacter = (): string | null => {
        if (this.position == this.data.length) {
          return null;
        } else {
          return this.data[this.position];
        }
    };

    public static createTokenType = (data:string):string => {
        return data.includes(".") ? "float" : "integer"
    }
}