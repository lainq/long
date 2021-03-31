const prompt = require('prompt-sync')({ sigint: true })

/**
 * Asks the user of input command and execute
 * the commands
 * 
 * @param {Function} callback the callback function to execute as
 * typescript functions cannot be imported into
 * node js. They are executed from typescript in the
 * callback function 
 */
const createLongInteractiveRepl = (callback) => {
    let userExit = false
    while (!userExit) {
        const command = prompt(">>>")
        if (command == ".exit") {
            process.exit()
        }
        callback(command)
    }
}

module.exports = { createLongInteractiveRepl }