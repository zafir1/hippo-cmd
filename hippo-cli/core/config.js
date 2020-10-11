const fs = require('fs');
const configurationFile = __dirname +'/../config.json';

class Configuration{
    constructor(){
        this.configurationFile = configurationFile;
        let configurationDataBuffer = fs.readFileSync(this.configurationFile);
        let configurationJSON = configurationDataBuffer.toString();
        this.configuration = JSON.parse(configurationJSON);
    }

    getConfiguration(){
        return this.configuration;
    }

    getDirectoryPath(directory){
        let basePath = this.configuration['basePath'];
        return basePath[directory];
    }
}

module.exports = Configuration;