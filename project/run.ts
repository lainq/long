import {join} from 'path';
import {existsSync, readFileSync} from 'fs';

import {LongException} from '../exception/error';
import {LongLexicalAnalyser} from '../lexer';
import {LongCommand} from '../command/command';

export class LongApplication {
  // the default config file identifier
  private static readonly longConfigIdentifier = 'long.json';

  // the patth of the project
  private readonly path: string;

  // the path of the config file
  private readonly config: string;

  constructor(path: string) {
    this.path = path;
    this.config = join(this.path, LongApplication.longConfigIdentifier);

    // if config file does not exists, throw an
    // erxception
    if (!this.configExists(this.config)) {
      const exception = new LongException(
        `Cannot find config file at ${this.config}`,
        'Try running the new command',
        'ConfigError'
      ).evokeLongException();
    }

    const entryPoint = this.readConfigFile(this.config);
    // if enrty point file does not exists, throw an
    // erxception
    if (!this.configExists(entryPoint)) {
      const exception = new LongException(
        'An Error occured while reading the file',
        'Recheck the filename',
        'ReadFile'
      ).evokeLongException();
    }

    this.runApplication(entryPoint);

    process.exit();
  }

  /**
   * @private
   *
   * Run the entry point file
   *
   * @param path The path of the file
   */
  private runApplication = (path: string): void => {
    const data = readFileSync(path);
    const fileReadData = data.toString();
    const lexer = new LongLexicalAnalyser(fileReadData);
    const tokens = lexer.createLexicalAnalyser();

    const commands = new LongCommand(tokens);
  };

  /**
   * @private
   *
   * Reads the config file and returns only the entry
   * point after parsing the string into a javascript
   * object
   *
   * @param {String} configPath The path of the config file
   * @returns {String} The path of the main file to run
   */
  private readConfigFile = (configPath: string): string => {
    const data = JSON.parse(readFileSync(configPath).toString());
    return data.main.toString();
  };

  /**
   * @private
   *
   * Check if the file passed in as the parameter
   * exists and returns a boolean value
   *
   * @param {String} path The path of the file to check existence
   * @returns {Boolean} If the file exists or not
   */
  private configExists = (path: string): boolean => {
    try {
      return existsSync(path);
    } catch (err) {
      return false;
    }
    return false;
  };
}
