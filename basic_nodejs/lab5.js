import fs from 'fs';
/*
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
  
/*writeDemo1().then(function(){
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
      writeDemo1();
      let dataDemo1 = await readDemo1();
      await writeDemo2(dataDemo1);

      return dataDemo1;
    } catch (error) {
      console.error(error);
    }
}

async function main() {
  console.log(await copyFile());
}
main();*/
/*

function wait1() {
  return new Promise(function(resolve, reject) {
      setTimeout(function(){
          console.log('resolve1');
          resolve('wait1');
      }, 3000);
  });
}
function wait2() {
  return new Promise(function(resolve, reject) {
      setTimeout(function(){
        console.log('resolve2');
          resolve('wait2');
      }, 3000);
  });
}

async function waitAll() {
  try {
      await wait1();
      //throw Error("MyError");
      console.log("Between 1-2");
      await wait2();
      console.log("Between 2-end");
      await waitAll();
  } catch (exception) {
      console.error(exception);
  }
}

async function waitAll2() {
  await wait2();
  console.log("Between 1-2");
  await wait1();
  console.log("Between 2-end");
}
waitAll(); // wait 6 seconds
waitAll2();
*/
/********** Promise.all own version ********* */
/*
function myWait(value, order, length, callback) {
  setTimeout(function(param){
    console.log(param);
    callback(param * 2, order, length);
  }, 1000, value);
}

let resultArr = [];
function onCompleted(result, order, length) {
  resultArr[order] = "Order: " + order + " : " + result;
  if (resultArr.length == length) {
    console.log(resultArr);
  }
}

function promiseAll(arr) {
  for (let i = 0; i<arr.length; i++) {
    myWait(arr[i], i, arr.length, onCompleted);
  }
}

promiseAll([5,6,7]);
*/

// promisify
import util from 'util';

const readFileAsync = util.promisify(fs.readFile);
function wait99(callback) {
  setTimeout(function(){
    callback(null,{a:1,b:2});
  },1000);
}

const wait99Async = util.promisify(wait99);
async function testRead(filename) {
  let temp2;
  try {
    const temp = await readFileAsync(filename, 'utf8');
    temp2 = await wait99Async();
    console.log(temp2);
  } catch (exception) {
    console.error(exception);
  }
}
testRead('robot/head.txt');
