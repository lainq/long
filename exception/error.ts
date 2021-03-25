import {red, green} from 'chalk';

export class LongException {
  private readonly exceptionMessage: string;
  private readonly suggestion: string;

  /**
   * @constructor
   *
   * @param errorMessage The message to be thrown
   * @param suggestion Any suggestions to fix the eror
   * @param type The type of the errpr
   */
  constructor(errorMessage: string, suggestion: string, type: string) {
    this.exceptionMessage = errorMessage.toString();
    this.suggestion = suggestion;

    this.evokeLongException(type);
  }

  /**
   * @private
   *
   * Throw out the exception message followed by
   * the suggestion message
   *
   * @param exceptionType The type of the exception
   */
  private evokeLongException = (exceptionType: string): void => {
    const errorOutputMessage = [
      red(`[${exceptionType}] ${this.exceptionMessage}`),
      green(`[Suggestion] ${this.suggestion}`),
    ];
    for (
      let errorIndex = 0;
      errorIndex < errorOutputMessage.length;
      errorIndex++
    ) {
      const currentErrorMessage = errorOutputMessage[errorIndex];
      console.log(currentErrorMessage);
    }
  };
}
