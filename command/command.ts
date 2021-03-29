import {stdout} from 'process';

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
      // loop through each command(code which is separated by a space)
      const currentCommand = this.commandList[commandIteratorIndex];
      for (
        let tokenIndex = 0;
        tokenIndex < currentCommand.length;
        tokenIndex++
      ) {
        // the current token in the current command
        const currentToken = currentCommand[tokenIndex];
        // checks if the current token is the last
        // token in the current command
        const tailToken = tokenIndex == currentCommand.length - 1;

        if (currentToken.tokenType == 'number') {
          // numbers cannot be at the tail of a command
          // because number should be followed by an operator
          // if the number is at the tail, the number follows
          // no operator, if so throw an exception
          if (tailToken) {
            const exception = new LongException(
              'A number without an operator',
              'Try adding an operator',
              'UnknownOperator'
            ).evokeLongException();
            continue;
          }

          const nextToken = currentCommand[tokenIndex + 1];
          // An operator should be followed by an operator
          // if so, evaluate the operation
          // else, throw an exception
          if (nextToken.tokenType != 'operator') {
            const exception = new LongException(
              'A number without an operator',
              'Try adding an operator',
              'UnknownOperator'
            ).evokeLongException();
            continue;
          } else {
            const increment = `${
              this.currentASCIICharacter
            }${nextToken.tokenData.toString()}${parseInt(
              currentToken.tokenData
            )}`;
            this.currentASCIICharacter = parseInt(eval(increment));
          }
        } else if (currentToken.tokenType == 'operator') {
          // if the current token is an operator
          // make sure the previous token is an operator
          // and that the operator is not the first token
          // of the command and throw errors accordingly
          if (tokenIndex == 0) {
            const exception = new LongException(
              'Cannot have an operator without a number',
              'Try adding an number',
              'NumberError'
            ).evokeLongException();

            continue;
          }
          const previousToken = currentCommand[tokenIndex - 1];
          if (!(previousToken.tokenType == 'number')) {
            const exception = new LongException(
              `An operator[${currentToken.tokenData}] cannot be followed by another operator[${previousToken.tokenData}]`,
              'Try adding a number',
              'OperatorError'
            ).evokeLongException();
            continue;
          }
        } else {
          // else, check whether the token
          // is among the builtin functions
          if (currentToken.tokenType == 'print') {
            const asciiCharacter = String.fromCharCode(
              this.currentASCIICharacter
            );
            stdout.write(asciiCharacter);
          } else if (currentToken.tokenType == 'clear') {
            this.currentASCIICharacter = 0;
          }
        }
      }
    }
    process.exit();
  };
}
