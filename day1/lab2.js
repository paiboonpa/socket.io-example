const fs = require('fs');

function writeDemo1() {
    return new Promise(function(resolve, reject) {
      fs.writeFile('demofile1.txt', 'test', 'utf8', function(err) {
        if (err)
          reject(err);
        else
          resolve();
      });
    });
}

function readDemo1() {
    return new Promise(function(resolve, reject) {
        fs.readFile('demofile1.txt', 'utf8', function(err, dataDemo1) {
        if (err)
          reject(err);
        else
          resolve(dataDemo1);
      });
    });
}
  

function writeDemo2(dataDemo1) {
    return new Promise(function(resolve, reject) {
      fs.writeFile('demofile2.txt', dataDemo1, 'utf8', function(err) {
        if (err)
          reject(err);
        else
          resolve("Promise Success!");
      });
    });
}
  
writeDemo1().then(function(){
    return readDemo1();
}).then(function(dataDemo1){
    return writeDemo2(dataDemo1);
}).then(function(data){
    console.log(data);
}).catch(function(error){
    console.error(error)
});

async function copyFile() {
    try {
      await writeDemo1();
      let dataDemo1 = await readDemo1();
      await writeDemo2(dataDemo1);
    } catch (error) {
      console.error(error);
    }
}
copyFile();
  
console.log(process.cwd());