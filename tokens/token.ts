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

// The list of operators used for arithmetic calculations
// "+" for addition, "-" for subtraction .etc
export const operators = ['+', '-', '/', '*']

/**
 * The function contains a set of keys which are types of
 * operators in the pattern same as of the operators variable
 * If the parameter is present in the list of operators
 * return the corresponding element in the keys list
 * else, return null
 *
 * @param {String} operator The operator that we to check the type of
 * @returns {String | null} The type of the prameter or null
 */
export const detectOperatorIdentifier = (operator): string | null => {
  const keys = ['add', 'subtract', 'divide', 'multiply'];
  if (operators.includes(operator)) {
    return keys[operators.indexOf(operator)];
  } else {
    return null;
  }
};

export const builtinFunctions = {
  "#" : {type:"print"},
  "^" : {type:"clear"},
  "!" : {type:"valid"}
}
