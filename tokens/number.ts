import {TokenAnalyse} from '../lexer';
import {LongException} from '../exception/error';

export class LongNumber {
  private position: number;
  private data: string;
  private readonly line: number;

  /**
   * @constructor
   * @param token The Token interface with the position and the
   * data inside of the file
   */
  constructor(token: TokenAnalyse) {
    this.position = token.position;
    this.data = token.data;

    this.line = token.lineNumber;
  }

  /**
   * @public
   *
   * keeps in track of the end of the file and also ,
   * keep in  trackof numbers and decimal points
   * to create a number object(either an integer or a float)
   *
   * @returns An object with the line data and the new position
   */
  public createNumberToken = () => {
    let character = this.setCurrentCharacter();
    let numberString = '';
    let dotCount = 0;

    while (
      character != null &&
      (Number.isInteger(parseInt(character)) || character == '.')
    ) {
      if (character == '.') {
        dotCount += 1;
        if (dotCount > 1) {
          const exception = new LongException(
            `Number cannot contain more than 1 decimal point`,
            'Enter a valid number',
            `[DecimalError] at ${this.line}`
          ).evokeLongException();

          // exit the application
          process.exit(1);
        }
      }

      numberString += character.toString();

      this.position += 1;
      character = this.setCurrentCharacter();
    }
    return {
      number: numberString,
      position: this.position,
    };
  };

  /**
   * @public
   *
   * Sets the current character based on the postion(the index
   * of the lexer on the file)
   *
   * Return null if it is the tail of the file
   * @returns {String | null}
   */
  public setCurrentCharacter = (): string | null => {
    if (this.position == this.data.length) {
      return null;
    } else {
      return this.data[this.position];
    }
  };

  /**
   * @public @static
   *
   * Returns float if the string contains a decimal
   * point, else, returns Integer
   *
   * @param {String} data The data to check if it is an integer
   * or a float
   *
   * @returns {String} Integer or float
   */
  public static createTokenType = (data: string): string => {
    return data.includes('.') ? 'float' : 'integer';
  };
}
