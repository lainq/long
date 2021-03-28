import {stdout, stdin, cwd} from 'process';
import {createInterface} from 'readline';
import {cyan} from 'chalk';
import {join} from 'path';
import {readdirSync, mkdir} from 'fs';

import {LongException} from '../exception/error';

// input interface used to get the
// project name as an input from the
// user
const inputInterface = createInterface({
  input: stdin,
  output: stdout,
});

export class LongProject {
  private projectName: string;
  private projectDirectory: string;

  /**
   * @constructor
   *
   * @param name The name of the project
   * @param directory The path of the project directory
   */
  constructor(name, directory) {
    this.projectName = name;
    this.projectDirectory = this.isValidDirectory(directory);

    this.createProjectFiles()
  }

  public createProjectFiles = () => {
    const files = {config:join(
      this.projectDirectory, "long.json"
    ), main:join(
      this.projectDirectory, "index.ts"
    )}

    const keys = Object.keys(files)
    for(const key in keys){
      const currentKey = files[keys[key]]
      if (keys[key] == "main"){
        
      }
    }
  }
  

  /**
   * @public
   * @static
   *
   * Asks the user for the project name via the readline
   * input interface and initialize a new project
   */
  public static createLongProject = () => {
    inputInterface.question(cyan('Project Name [?] '), (answer) => {
      if (answer == '') {
        answer = '.';
      }
      const directory = answer == '.' ? cwd() : join(cwd(), answer);

      const project = new LongProject(answer, directory);
      inputInterface.close();
    });
  };

  /**
   * @private
   *
   * If the directory is the current directory, check
   * if the directory is empty, if true return the directory.
   * else, throw an exception
   *
   * Else, try creating the directory . If error occurs ,
   * throw an error . Else return the directory
   *
   * @param directory The actual valid path
   * @returns  The actual valid path
   */
  private isValidDirectory = (directory: string): string => {
    if (!(cwd() == directory)) {
      mkdir(directory, (error: NodeJS.ErrnoException) => {
        if (error) {
          const exception = new LongException(
            `${directory} exists`,
            'Try another project name',
            'ProjectError'
          ).evokeLongException();
        }
      });
      return directory;
    }
    let files = readdirSync(directory);
    if (files.length != 0) {
      const exception = new LongException(
        'Folder not empty',
        'Try another project name',
        'DirectoryError'
      ).evokeLongException();
    } else {
      return directory;
    }
  };
}
