export interface Token {
  // the type of the token
  tokenType: string;

  // the data inside of the token
  tokenData: any;
}

export const setCurrentCharacter = (data:string, pos:number):string | null => {
  if (data.length == pos) {
    return null
  } else {
    return data[pos];
  }
}