const prompt = require('prompt-sync')({sigint: true})

const createLongInteractiveRepl = (callback) => {
    let userExit = false
    while(!userExit){
        const command = prompt(">>>")
        if(command == ".exit"){
            process.exit()
        }
        callback(command)
    }
}

module.exports = {createLongInteractiveRepl}