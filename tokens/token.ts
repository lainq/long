export interface Token {
  // the type of the token
  tokenType: string;

  // the data inside of the token
  tokenData: any;
}

/**
 *
 * @param {String} data The data inside of the file
 * @param {number} pos The position of the lexer
 *
 *
 * @returns {String | null} return the character at the postion index
 * if the postion is not the tail of the string, else ,
 * return null
 */
export const setCurrentCharacter = (
  data: string,
  pos: number
): string | null => {
  if (data.length == pos) {
    return null;
  } else {
    return data[pos];
  }
};

export const operators = ['+', '-', '/', '*', '^'];

export const detectOperatorIdentifier = (operator) => {
  const keys = ['add', 'subtract', 'divide', 'multiply', 'exp'];
  if (operators.includes(operator)) {
    return keys[operators.indexOf(operator)];
  } else {
    return null;
  }
};
