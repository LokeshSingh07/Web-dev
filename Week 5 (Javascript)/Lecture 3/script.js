

// ________________ Math in-built object
/*
console.log(Math.round(1.9));       //return the nearest integer
console.log(Math.round(1.2));       
console.log(Math.ceil(4.2));        //return the value of x rounded (up) to its nearest integer
console.log(Math.ceil(-4.2));
console.log(Math.floor(-4.8));      //return the value of x rounded (down) to its nearest integer
console.log(Math.trunc(12.39));     //return the integer part of x 
console.log(Math.sign(32));         //return if x is negative, null or positive
console.log(Math.abs(3));           //return the absolute (positive) value of x
console.log(Math.abs(34.5));
console.log(Math.abs(-4));
console.log(Math.pow(5,3));         //return the value of x to the power of y
console.log(Math.random());           //return a random number between 0(inclusive) and (exclusive)
console.log(Math.max(1,5,7,3,44,43));
console.log(Math.min(54,34,63,99,43));
console.log(Math.PI);              //return PI
console.log(Math.SQRT2);           //return the square root of 2
console.log(Math.SQRT2_3);         //return the square root of 2/3
console.log(Math.SQRT2);
*/





// ----------------------------------------------------------------------------------





// ________________ String built in object  - (string is primitive)
/*
let firstName = 'This is Lokesh singh';
let lastName = new String('Singh');

let result = lastName.length;
// let result = lastName[4];
// let result = firstName.includes('ke');
// let result  = firstName.startsWith('lo');
// let result = firstName.endsWith('dh')
// let result = firstName.indexOf('k');
// let result = firstName.toUpperCase();
// let result = firstName.toLowerCase();
// let result = firstName.trim();           //trim method remove the exta space from starting and ending
// let result = firstName.replace('kesh', 've');
// let result = firstName.concat(" ", lastName);
// let result = firstName.split("|");          // 'LOKESH|SINGH'


console.log(result);
*/





// ----------------------------------------------------------------------------------





// ________________ template literal
/*
let firstName = 'lokesh singh'
let message1 = 'this is a simple text';

let message2 = `This is
simple 
text`;


console.log(message2)
console.log(`hello this is  ${firstName}`);
*/





// ----------------------------------------------------------------------------------





// ________________ Date and time 
/*
let date = new Date();
// let date = new Date('feb, 02, 1988');

// getter and setter function
date.setFullYear(2011);
date.getMilliseconds(33);


console.log(date);
*/





// ----------------------------------------------------------------------------------





// ________________ Array methods (Object/reference)
/*
let arr = [2,4,6,7,33];
console.log(arr);

// ----- Insertion (Adding new element)
// arr.push(33);              //end
// arr.unshift(1);            //beginning
// arr.splice(2,0,'LK');      //middle

// console.log(arr);




// ----- searching (Finding element)

// searching primitive in array
// let result = arr.indexOf(7);
// let result = arr.includes(33);           //good pratice
// console.log(result);


// searching object in array
// let courses = [
//     {no: 1, naam: 'lokesh'},
//     {no: 2, naam: 'Japoo'}
// ];

// let result = courses.find(function(o){
//     return o.no===2;
// });
// let result = courses.find(element => element.naam=='lokesh');
// console.log(result);



// ------ Removing element
// arr.pop();           //end
// arr.shift();         //begnning
// arr.splice(2,1)      //middle - (first is for index and second is for how many element you want to delete)
// console.log(arr);



// ------ Emptying an arry
let number = arr;


// arr = [];
// arr.length = 0;
// arr.splice(0, arr.length); 
// console.log(arr);
// console.log(number);




// ----- combining element
let first = [1,3,5];
let second = [4,6,8];

let combined = first.concat(second);
console.log(combined);



// ----- slicing
let marks = [10,20,30,40,50,60,70,80];

// let sliced = marks.slice();
// let sliced = marks.slice(3);
let sliced = marks.slice(4,7);          //slice(x,y) x is inclusive and y is exclusive

console.log(sliced)
*/





// ----------------------------------------------------------------------------------





// ________________ Spread operator
/*
let first = [1,3,5];
let second = [3,6,8];

// to add 
let combined = [...first, 'a', true, ...second,undefined,null];
console.log(combined);

// to copy
let another = [...combined];
console.log(another);
*/




// ________________ iteration on array
/*
let arr = [10,20,30,40,50];
// for(let key of arr){
//     console.log(key);
// }

// arr.forEach(function(num){console.log(num)});
arr.forEach(num =>console.log(num));
*/





// ________________ Joining method
// let numbers = [1,2,3,4,5,6];
// const joined = numbers.join(',');
// console.log(joined);




// ________________ split method
// let message = 'This is a text message';
// let parts = message.split(" ");
// console.log(parts);




// ________________ sorting method
// let num = [2,4,7,4,87,21];
// num.sort();
// console.log(num);


// num.reverse();
// console.log(num);





// ----------------------------------------------------------------------------------





// ________________ Filtering arrays
// let numbers = [1,2,-3,-4,11,-6];

// let filtered = numbers.filter(function(val){
//     return val>0;
// });

// console.log(filtered);





// ________________ Mapping arrays

// ----- mapping with array
// let numbers = [7,8,9,10];
// console.log(numbers);

// let items = numbers.map(function(value){
//     return 'Student_no: ' + value;
// });

// console.log(items);



// ------ mapping with object
let numbers = [1,2,-6,-9];

// let filtered = numbers.filter(value => value>=0);
// let items = filtered.map(function(num){
//     let obj = {value:num};
//     return obj;
// });

let items = numbers.filter(value => value >= 0)
                    .map(num => {value: num});

console.log(items);






