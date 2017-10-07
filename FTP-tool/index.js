const Client = require('ftp');
const ftp = require('./config/config');
const path = require('./config/path');
const fs = require('fs');
const c = new Client();
const {exec} = require('child_process');
c.on('ready', function() {
    new Promise(function (resolve,reject) {
        let count =0;
        console.log('');
        console.log('Remot file Path:')
        console.log(path.orig)
        console.log('')
        console.log('Target file path');
        console.log(path.to);
        console.log('');
        console.log('Local file path');
        console.log(path.local);
        for (let k of path.orig) {
            c.get(k, function (err, stream) {
                if (err) throw err;
                stream.once('close', function () {
                    c.end();
                });
                let dir = k.slice(k.lastIndexOf('/'))
                stream.pipe(fs.createWriteStream(`./download${dir}`));
                count++;
                if(count===path.orig.length){
                    resolve(count);
                }
            });
        }
    }).then(function (count) {
        exec('npm run build', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            let target = 'Convert success!';
            return target;
        });
    },function () {
        console.log('err');
    }).then(function (target) {
        for(let k of path.to.keys()){
            let rs = fs.createReadStream(path.local[k]);
            rs.on('dara',(data)=>{
                c.put(data,path.to[k],(err)=> {
                    if(err){
                        throw err;
                    }
                });
            })
        }
        return target;
    },function (err) {
        console.log(err);
    }).then((target)=>{
        console.log("");
        console.log("Update completed！！！！")
    })
});
c.connect({host:ftp.host,port:ftp.port,user:ftp.user,password:ftp.password});