var fs = require("fs");
 
const myReadFile = (fileName) => {
    return new Promise(function(resolve,reject){
        fs.readFile(fileName,(err,data) => {
            if (!err) {
                resolve(data);
            }else{
                reject(err);
            }
        });
    });
}

module.exports = {
  myReadFile
}