const FileSystem = require('./core/fileSystem.js');
const Configuration = require('./core/config.js');
let configuration = new Configuration();
const basePath = __dirname + '/' + configuration.getDirectoryPath('controller');
const fileSystem = new FileSystem(basePath);
const yargs = require('yargs');
const chalk = require('chalk');

yargs.command({
    command: "generate controller",
    describe : chalk.green.bold("add a controller"),
    builder : {
        name : {
            describe : "Controller Name",
            demandOption : true,
            type : "string"
        },
        owner : {
            describe : "Controller Owner",
            demandOption : false,
            type : "string"
        },
        reviewer : {
            describe : "Controller Reviewer",
            demandOption : false,
            type : "string"
        }
    },
    handler : function(argument){
        let controllerName = argument.name;
        let ownerName = argument.owner;
        let reviewerName = argument.reviewer;
        let path = fileSystem.getBasePath();
        let pathExists = fileSystem.pathExists(path);
        if(pathExists){
            let filename = fileSystem.createFile(controllerName);
            if(filename){
                console.log(`\n${chalk.green.bold(controllerName)} ${chalk.greenBright('created successfully.')}`);
                console.log(`Path: ${chalk.cyan(filename)}\n`);
            }else{
                console.log(`\n${chalk.red.bold(controllerName)} ${chalk.redBright('is already present.')}\n`);
            }
        }
    }
});

yargs.parse();