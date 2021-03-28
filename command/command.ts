import {LongException} from '../exception/error';
import {Token} from '../tokens/token';
import {Position} from '../lexer';

export class LongCommand {
  private readonly commandList: Array<Array<Token>>;
  public currentASCIICharacter: number = 0;

  /**
   * @constructor
   *
   * @param {Array<Array<Token>>} commands The list of commands to be executed
   */
  constructor(commands: Array<Array<Token>>) {
    this.commandList = commands;

    this.executeCommandList();
  }

  /**
   * @public
   *
   * Iterates through the list of commands to execute
   */
  public executeCommandList = (): any => {
    for (
      let commandIteratorIndex = 0;
      commandIteratorIndex < this.commandList.length;
      commandIteratorIndex++
    ) {
      const currentCommand = this.commandList[commandIteratorIndex];
      for (
        let tokenIndex = 0;
        tokenIndex < currentCommand.length;
        tokenIndex++
      ) {
        const currentToken = currentCommand[tokenIndex];
        const tailToken = tokenIndex == currentCommand.length - 1;

        if (currentToken.tokenType == 'number') {
          if (tailToken) {
            const exception = new LongException(
              'A number without an operator',
              'Try adding an operator',
              'UnknownOperator'
            ).evokeLongException();
            continue
          }

          const nextToken = currentCommand[tokenIndex + 1]
          if(nextToken.tokenType != "operator"){
            const exception = new LongException(
              'A number without an operator',
              'Try adding an operator',
              'UnknownOperator'
            ).evokeLongException();
            continue
          } else {
            const increment = `${this.currentASCIICharacter}${nextToken.tokenData.toString()}${parseInt(currentToken.tokenData)}`
            this.currentASCIICharacter = parseInt(eval(
              increment
            ))
          }
        } else if(currentToken.tokenType == "operator"){
          const
        }

      }
    }
  };
}
