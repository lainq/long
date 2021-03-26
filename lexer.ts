import { LongException } from "./exception/error";
import { LongNumber } from "./tokens/number"
/**
 * The position or the index in the
 * string data read from the specified
 * filename
 *
 * Contains a position(which is the index),
 * and a tail[boolean] (end of the file or not)
 */
interface Position {
  position: number;
  tail: boolean;
}

export interface TokenAnalyse {
  position : number
  data : string
}

/**
 *
 *
 * @param {String} fileData The data in the file
 * @param {Position} position The current position of the lexer
 * in the whole string
 * @param {String | null} character The current character
 *
 */
export class LongLexicalAnalyser {
  private readonly fileData: string;
  private position: Position;
  private character: string | null;
  private exceptions:Array<LongException> = new Array()

  private lineNumber:number = 1
  /**
   * @constructor
   * @param fileData the data in the file
   */
  constructor(fileData) {
    this.fileData = fileData.toString();
    this.position = {position: 0, tail: false};
    this.character = this.setCurrentCharacter();

  }

  /**
   * @private
   *
   * @returns {String | null} the current character or null
   */
  public setCurrentCharacter = (): string | null => {
    if (this.position.position == this.fileData.length) {
      this.position.tail = true;
      return null;
    } else {
      return this.fileData[this.position.position];
    }
  };

  /**
   * @public
   * 
   * @returns the tokens and list of exceptions
   */
  public createLexicalAnalyser = ():any => {
    this.character = this.setCurrentCharacter()
    while(this.character != null){
      if(this.character == " "){}
      else if(Number.isInteger(parseInt(this.character))){
        const number = new LongNumber({
          position : this.position.position,
          data : this.fileData
        })
        const numberInfo = number.createNumberToken()
        this.position.position = numberInfo.position

        console.log(numberInfo.number)
      }

      this.position.position += 1
      this.character = this.setCurrentCharacter()
    }
  }
}
