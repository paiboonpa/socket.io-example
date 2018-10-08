/*********** Function Example ************/

function hello(parameter1, parameter2, parameter3) {
    console.log('hello' + parameter1 + parameter2 + parameter3);
};
  
hello ('1','2','3');

let hello2 = function(parameter1, parameter2, parameter3) {
    console.log('hello' + parameter1 + parameter2 + parameter3);
};
function func(callback) {
    callback('1','2','3');
}
func(hello2);

function hello3() {
    return 1;
}  

function tryHello3(callbackFunction) {
    return callbackFunction();
}

console.log(hello3()); // 1
console.log(hello3); // Function
console.log( tryHello3(hello3) ); // 1
//console.log( tryHello3(hello3()) ); // ?

const myObject = {
    myProperty: 123,
    myFunction: function (message) {
      console.log(message);
    }
};
console.log(myObject.myProperty);
myObject.myFunction("Hello World!");  