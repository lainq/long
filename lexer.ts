import {LongException} from './exception/error';
import {LongNumber} from './tokens/number';
import {LongString} from './tokens/strings';
import {Token} from './tokens/token';
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
  position: number;
  data: string;
  lineNumber: number;
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
  private tokens: Array<Token> = new Array();

  private command: Array<Array<Token>> = new Array()

  private lineNumber: number = 1;
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
  public createLexicalAnalyser = (): any => {
    this.character = this.setCurrentCharacter();
    while (this.character != null) {
      if (this.character == ' ') {
      } else if (Number.isInteger(parseInt(this.character))) {
        // else, if the character converted to an integer
        // is not **NaN**, we take it as a number a try
        // to produce a new number
        const number = new LongNumber({
          position: this.position.position,
          data: this.fileData,
          lineNumber: this.lineNumber,
        });
        const numberInfo = number.createNumberToken();

        // updating the position so that the lexer continues
        // to tokenise after the number ends
        this.position.position = numberInfo.position;

        this.tokens.push({
          tokenType: LongNumber.createTokenType(numberInfo.number),
          tokenData: numberInfo.number,
        });
      } else if (this.character == '"') {
        // if the character is a quotation("")[The start of a string]
        // keep track of the string till the string ends with
        // another quotation mark and update the position
        // and also add the new token to the token array

        const string = new LongString(this.fileData, this.position.position);
        const stringInfo = string.createLongString();

        this.position.position = stringInfo.pos;
        this.tokens.push({
          tokenType: stringInfo.data.length == 1 ? 'char' : 'string',
          tokenData: stringInfo.data.toString(),
        });
      } else if(this.character == "\n"){
        this.lineNumber += 1
      }

      this.position.position += 1;
      this.character = this.setCurrentCharacter();
    }

    return this.tokens;
  };
}
