let fs = require('fs');
/*fs.writeFileSync('demofile1.txt', 'test content', 'utf8');
fs.writeFile('demofile1.txt', 'test content', 'utf8', function(err) {
  console.log('write complete!!');
});

let fileContent = fs.readFileSync('demofile1.txt', 'utf8');
console.log(fileContent);
fs.readFile('demofile1.txt', 'utf8', function(err, data) {
  console.log(data);
});

fs.writeFileSync('demofile1.txt', 'file1 content', 'utf8');
let data = fs.readFileSync('demofile1.txt', 'utf8');
console.log(data);

fs.writeFile('demofile2.txt', 'file2 content', 'utf8', function(err) {
    fs.readFile('demofile2.txt', 'utf8', function(err, data) {
      console.log(data);
    });
});
*/
for (let i=0; i<20; i++) {
    fs.readFile('demofile1.txt', 'utf8', function(err, data) {
        console.log(data);
    });
    fs.readFile('demofile2.txt', 'utf8', function(err, data) {
        console.log(data);
    });    
}
/*
fs.readFile('robot/body.txt', 'utf8', function(err, data) {
    if (err)
        console.log(err);
    console.log(data);
});
console.log(process.cwd());
*/