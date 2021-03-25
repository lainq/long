import {red, green} from 'chalk';

export class LongException {
  private readonly exceptionMessage: string;
  private readonly suggestion: string;

  constructor(errorMessage: string, suggestion: string, type: string) {
    this.exceptionMessage = errorMessage.toString();
    this.suggestion = suggestion;

    this.evokeLongException(type);
  }

  evokeLongException = (exceptionType: string): void => {
    const errorOutputMessage = [
      red(`[${exceptionType}] ${this.exceptionMessage}`),
      green(`[Suggestion] ${this.suggestion}`),
    ];
    for(let errorIndex=0; errorIndex < errorOutputMessage.length; errorIndex++){
        const currentErrorMessage = errorOutputMessage[errorIndex]
        console.log(currentErrorMessage)
    }
  };
}
