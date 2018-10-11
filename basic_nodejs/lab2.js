/*
console.log("start");
function async1() {
  console.log("no.2");
  setTimeout(() => {
    console.log("no.3");
    async2();
  },3000);
}
function async2() {
  console.log("no.4");
  setTimeout(() => {
    console.log("no.5");
  },3000);
}
console.log("no.1");
async1();

console.log("start");
function async1() {
  console.log("no.2");
  setTimeout(() => {
    console.log("no.3");
  },3000);
}
function async2() {
  console.log("no.4");
  setTimeout(() => {
    console.log("no.5");
  },3000);
}
console.log("no.1");
async1();
async2();

callbackValue = 'callbackValueOld';
function tryHello5() {
  let returnValue = 'returnValue';
  let callbackValue = 'callbackValueNew';
  console.log(callbackValue);
  setTimeout((err, value) => {
    callbackValue = value; 
    console.log(callbackValue); // print callbackValueNew after 3 sec
  }, 3000, null, callbackValue);
  return returnValue;
}
console.log(tryHello5()); // print returnValue
console.log(callbackValue); // print callbackValueOld
*/
function hello6(err, value) {
    callbackValue = value;
    console.log(callbackValue); // print callbackValueNew after 3 seconds
}
callbackValue = 'callbackValueOld';
function tryHello6(callbackFunction) {
    let returnValue = 'returnValue';
    let callbackValue = 'callbackValueNew';
    setTimeout(callbackFunction, 3000, null, callbackValue);
    return returnValue;
}
console.log(tryHello6(hello6)); // print returnValue
console.log(callbackValue); // print callbackValueOld
  
  