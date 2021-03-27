import {LongException} from '../exception/error';
import {Token} from '../tokens/token';
import {Position} from '../lexer';

export class LongCommand {
  private readonly commandList: Array<Array<Token>>;
  private position: Position;

  constructor(commands: Array<Array<Token>>) {
    this.commandList = commands;
    this.position = {
      position: 0,
      tail: this.commandList.length == 0,
    };

    this.executeCommandList();
  }

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
      }
    }
  };
}
