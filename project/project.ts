import {stdout, stdin, cwd} from 'process';
import {createInterface} from 'readline';
import {cyan, green} from 'chalk';
import {join} from 'path';
import {readdirSync, mkdir, writeFile} from 'fs';

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

    this.createProjectFiles();
    stdout.write(
      green(`Project successfully created at ${this.projectDirectory}`)
    );
  }

  /**
   * @public
   *
   * Loop through the dict of files to
   * be created and create files accordng
   * to their keys
   */
  public createProjectFiles = () => {
    const files = {
      config: join(this.projectDirectory, 'long.json'),
      main: join(this.projectDirectory, 'index.long'),
    };

    // if the file key is main(enrty-point)
    // create the file with a helloworld program
    // else if, it is config(config-file)
    // get the config data and write into it

    const keys = Object.keys(files);
    for (const key in keys) {
      const currentKey = files[keys[key]];
      if (keys[key] == 'main') {
        this.createNewFile(
          currentKey,
          '72+#29+#7+##3+#79-# 55+#24+#3+#6-#8-#68-#1+# ;'
        );
      } else if (keys[key] == 'config') {
        this.createNewFile(
          currentKey,
          this.createConfigFile(
            this.projectName,
            this.projectDirectory,
            files.main
          )
        );
      }
    }
  };

  /**
   * @public
   *
   * Takes the information about the project as the
   * parameters and generate the data for a config file
   * in the form of stringified json
   *
   * @param {String} name The name of the project
   * @param {String} directory The directory
   * @param {String} enrtyPoint The entry point to run
   * @returns {String} The stringified javascript object
   */
  public createConfigFile = (
    name: string,
    directory: string,
    enrtyPoint: string
  ): string => {
    return JSON.stringify({
      name: name,
      path: directory,
      main: enrtyPoint,
    });
  };

  /**
   * @public
   *
   * Recieves the filename and data to write as the parameters
   * and write the data to the file
   *
   * If any error occurs throw an UnknownLongException
   *
   * @param fileName The name of the file
   * @param fileData The data to write
   */
  public createNewFile = (fileName, fileData) => {
    writeFile(fileName, fileData, (error) => {
      if (error) {
        const exception = new LongException(
          'An error occured',
          'Try again',
          'UnknownError'
        ).evokeLongException();
      }
    });
  };

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
