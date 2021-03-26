import {setCurrentCharacter} from './token';

export class LongString {
  private data: string;
  private pos: number;

  /**
   * @constructor
   *
   * @param data The data inside of the file
   * @param pos The position of the lexer in the data
   */

  constructor(data, pos) {
    this.data = data;
    this.pos = pos;
  }

  /**
   * @public
   *
   * @returns a javascript object of the string data
   * along with the position for the lexer to continue
   * tokenising
   */
  public createLongString = (): any => {
    let character: string = setCurrentCharacter(this.data, this.pos);
    let string: string = '';
    let quotationCount = 0;

    while (character != null) {
      // check for a second quotation and if
      // the count of quotations is qual to two(2)
      // break the loop and return the formed string
      if (character == '"') {
        quotationCount += 1;
        if (quotationCount == 2) {
          break;
        }
      }

      string += character.toString();
      this.pos += 1;
      character = setCurrentCharacter(this.data, this.pos);
    }

    return {
      data: string.toString().slice(1, string.length),
      pos: this.pos,
    };
  };
}
