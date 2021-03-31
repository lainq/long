import {join} from 'path';
import {writeFileSync, existsSync, readFileSync, mkdirSync} from 'fs';

import {LongException} from '../exception/error';

export class LongProjectStore {
  private readonly projectName: string;
  private projectDirectory: string;

  // the path of store where the information about the
  // projects is stored
  public store: string = join(__dirname, 'json', 'store.json');

  /**
   * @constructor
   *
   * @param {String} name The name of the project
   * @param {String} directory The path of the project
   */
  constructor(name: string, directory: string) {
    this.projectName = name;
    this.projectDirectory = directory;
  }

  /**
   * @private
   *
   * Takes in a filename and check if the file exists or not
   *
   * @param filename The name of the file to check
   * the existence
   * @returns A boolean whether the file exists or
   * not
   */
  private checkFileExistence(filename: string): boolean {
    try {
      return existsSync(filename);
    } catch (eror) {
      return false;
    }
    return false;
  }

  /**
   * @public
   *
   * Store the information about the project
   * in the store file
   *
   * Check if certain files or folders exist and
   * then proceed to create them
   *
   */
  public storeProjectInformation = (): void => {
    const store = this.store;
    if (!this.checkFileExistence(join(__dirname, 'json'))) {
      mkdirSync(join(__dirname, 'json'));
    }

    if (!this.checkFileExistence(store) || !this.isFileEmpty(store)) {
      writeFileSync(
        store,
        JSON.stringify({
          projects: [],
        })
      );
    }

    // read the information from the file and parse
    // it to JSON data
    let data = JSON.parse(readFileSync(store).toString());

    //  Check if the dictionary has a key calles
    // projects which is an array of all
    // the projects created

    if (!Object.keys(data).includes('projects')) {
      const exception = new LongException(
        'Process aborted due to an internal error',
        'Try creating a new project',
        'InternalError'
      ).evokeLongException();
    }

    // add the new project information
    // to the dictionary
    data.projects.push({
      name: this.projectName,
      path: this.projectDirectory,
      created: this.createdAt(new Date()),
    });

    this.writeFile(this.store, data);
  };

  /**
   * @public
   *
   * Write information into a file
   *
   * @param {String} store The location of the storage file
   * to save the data
   * @param {String} data The data to save inside of the file
   */
  public writeFile = (store: string, data: string): void => {
    writeFileSync(store, JSON.stringify(data));
  };

  /**
   * @private
   *
   * Recieves a date as the parameter and
   * returns it as a string after formatting
   *
   * @param {Date} date The date object to format as a string
   * @returns Formatted date in the form of a string
   */
  private createdAt = (date: Date): string => {
    let dateString = '';
    let values = [date.getDate(), date.getMonth(), date.getFullYear()];
    for (let dateIndex = 0; dateIndex < values.length; dateIndex++) {
      dateString += values[dateIndex];
      if (dateIndex != values.length - 1) {
        dateString += '-';
      }
    }
    return dateString;
  };

  /**
   * @private
   *
   * Checks if a file is empty or not
   *
   * @param path The path of the file to check if
   * empty
   * @returns A boolean, whether the file is empty
   * or not
   */
  private isFileEmpty = (path: string): boolean => {
    if (!this.checkFileExistence(path)) {
      return false;
    }
    const data = readFileSync(path).toString();
    try {
      let json = JSON.parse(data);
      return true;
    } catch (error) {
      return false;
    }
  };
}
