import {argv, cwd, stdout} from 'process';
import {readFile, existsSync} from 'fs';
import {magentaBright, cyan} from 'chalk';

import {LongException} from './exception/error';
import {LongLexicalAnalyser} from './lexer';
import {LongCommand} from './command/command';
import {LongProject} from './project/project';
import {LongApplication} from './project/run';
import {LongProjectList} from './project/list';
import {createLongInteractiveRepl} from './shell/shell.js'

/**
 *
 * @param {string} filename The name of the file
 *
 * Checks if the file exists, if yes, raed the file,
 * else, throw a LongException and also create a new
 * lexer object after reading the file
 *
 * @returns {undefined | LongException} undefine dor an error message
 */
export const createLongLexer = (filename: string) => {
  const fileExists = existsSync(filename);
  if (!fileExists) {
    const fileNotFound = new LongException(
      `Unable to find ${filename}`,
      'Check for typos',
      'FileNotFound'
    );
    return fileNotFound;
  }

  readFile(filename, (error: NodeJS.ErrnoException, data: Buffer) => {
    if (error) {
      const exception = new LongException(
        'An Error occured while reading the file',
        'Recheck the filename',
        'ReadFile'
      ).evokeLongException();
      return exception;
    } else {
      const fileReadData = data.toString();
      const lexer = new LongLexicalAnalyser(fileReadData);
      const tokens = lexer.createLexicalAnalyser();

      const commands = new LongCommand(tokens);
      process.exit();
    }
  });
};

class LongArgumentParser {
  private arguments: Array<string>;
  private length: number;

  /**
   * @constructor
   * @param {string[]} argument The command line arguments to parse
   */
  constructor(argument: Array<string>) {
    this.arguments = argument.slice(2, argument.length);
    this.length = this.arguments.length;
  }

  /**
   * @public
   *
   * If there are no arguments, return undefined
   * else,if the first argument ends with long(.long)
   * file extension, read the file and create a lexer
   *
   * @returns {undefined}
   */
  public parseLongArguments = () => {
    if (this.length == 0) {
      return undefined;
    } else {
      if (this.arguments[0].endsWith('.long')) {
        const coderunner = createLongLexer(this.arguments[0]);
      } else if (this.arguments[0] == 'help') {
        const outputLinks = [
          {
            text: 'Github',
            link: 'https://github.com/pranavbaburaj',
          },
          {
            text: 'Discord',
            link: 'https://discord.gg/vzcNRVrHR5',
          },
          {
            text: 'Discussions',
            link: 'https://github.com/pranavbaburaj/long/discussions',
          },
          {
            text: 'Report a bug',
            link: 'https://github.com/pranavbaburaj/long/issues',
          },
        ];
        console.log(magentaBright('Long Help Center \n'));
        for (let index = 0; index < outputLinks.length; index++) {
          const link = outputLinks[index];
          console.log(cyan(`[${link.text}] (${link.link})`));
        }
      } else if (this.arguments[0] == 'new') {
        const project = LongProject.createLongProject();
      } else if (this.arguments[0] == 'run') {
        const application = new LongApplication(cwd());
      } else if (this.arguments[0] == 'list') {
        const list = new LongProjectList();
      } else if(this.arguments[0] == "shell"){
        createLongInteractiveRepl((data) => {
          const lexer = new LongLexicalAnalyser(data);
          const tokens = lexer.createLexicalAnalyser();

          const commands = new LongCommand(tokens);
          stdout.write("\n")
        })
      }
    }
    return undefined;
  };
}

// The argument parser
const longArgumentParser = new LongArgumentParser(argv);
longArgumentParser.parseLongArguments();
