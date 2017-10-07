/*
* This is the configuration of the originPath/toPath on your ftp-server.(The es6 file path)
* originDir might be the dev dir (include all the es6 file)
* toDir might be the build dir (include all the es5 file that can be displayed normal on the client)
* path might be the path of all files
* */
let originDir ='devDir/';
let toDir ='clientDir/';
let path=['file1','file2','file3'];
let originPath = path.map((item)=> {
    return originDir+item;
});
let toPath=path.map((item)=>{
    return toDir+item;
});
let localPath=path.map((item)=>{
    return 'download/'+item.substring(item.lastIndexOf('/')+1);
})
module.exports.orig=originPath;
module.exports.to=toPath;
module.exports.local=localPath;