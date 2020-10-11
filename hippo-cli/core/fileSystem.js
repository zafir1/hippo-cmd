const fs = require('fs');
const cmd = require('node-cmd');
const makeDir = require('make-dir');

class FileSystem{

    constructor(basePath){
        this.basePath = basePath;
        this.errors = [];
    }

    pathExists(path){
        let error = (!fs.existsSync(path)) ? {path: path} : null;
        error ? this.errors.push(error) : "";
        return (this.errors.length === 0);
    }

    fileExists(filename, path=this.basePath){
        if(!this.pathExists(path)) return false;
        filename = this.getValidFileName(filename,path);
        let error = (!fs.existsSync(filename)) ? {file : filename} : null;
        error ? this.errors.push(error) : '';
        return (this.errors.length === 0);
    }

    getValidFileName (filename,directory=this.basePath) {
        while(directory.length && directory.slice(-1)=='/'){
            directory = directory.slice(0,-1);
        }
        return (directory+'/'+filename);
    }

    getValidDirectory (directory,path=this.basePath){
        while(directory.length && directory[0]=='/'){
            directory = directory.slice(1);
        }
        return this.getValidFileName(directory,path);
    }

    createDirectory(directory, path=this.basePath){
        this.pathExists(path);
        if(this.errors.length) return false;
        (async () => {
            directory = this.getValidDirectory(directory,path);
            directory = await makeDir(directory);
        })();
        return directory;
    }

    createFile(filename,path=this.basePath){
        if(this.fileExists(filename,path)) return false;
        filename = this.getValidFileName(filename,path);
        let fileCreated = fs.writeFileSync(filename,'');
        !fileCreated ? this.errors.push({fileCreationFailed: filename}) : ""
        return filename;
    }
    
    getErrors(){
        return this.errors;
    }

    getBasePath(){
        return this.basePath;
    }
}

module.exports = FileSystem;



