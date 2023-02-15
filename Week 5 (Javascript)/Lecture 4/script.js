


// _____________ function declarartion
function run(){
    console.log("hello jee");
}

// function call or invoke
run();



// _____________ Named function assignment
let stand = function walk(){
    console.log("Named function called");
};

stand();
let jump = stand;
jump();



// _____________ Anonymous function assignment
let stand2 = function(){
    console.log("Anonymous function called")
}
stand2();





// ----------------------------------------------------------------------------------





// _____________ JS is Dynamic language
let x = 1;
x = 'a';
console.log(x);


function sum(a,b){
    return a+b;
}

console.log(sum(1,2));
console.log(sum(1));
console.log(sum());
console.log(sum(1,2,3,4,5));


// ----- arguments  (special object)
function add(a,b){
    console.log(arguments);
    return a+b;
}
let ans = add(4,4);


// ----- arguments dynamic
function sumation(){
    let total = 0;
    for(let value of arguments){
        total += value;
    }
    return total;
}

// let result = sumation();
let result = sumation(1,2,3,4);
console.log(result);






// _____________ Rest operator
function sum(num,value, ...args){
    console.log(args);
}

sum(1,2,3,4,5);





// _____________ Default parameter
function interest(p, r=6, y=5){
    return p*r*y/100;
}


console.log(interest(1000,10,6));
console.log(interest(1000,undefined,5));
console.log(interest(1000,undefined,undefined));





// ----------------------------------------------------------------------------------





// _____________ Getter & Setter


//getter -> access properties
//setter -> change or mutate properties

/*
let person = {
    fName : 'lokesh',
    lName : 'singh'
}
// console.log(person);


// issue -> read only
function fullName(){
    return `${person.fName} ${person.lName} `;
}
console.log(fullName());
*/


let person = {
    fName : 'lokesh',
    lName : 'singh',

    get fullName(){
        return `${person.fName} ${person.lName}`;
    },

    set fullName(value){
        let parts = value.split(' ');
        this.fName = parts[0];
        this.lName = parts[1];
    }

}


console.log(person.fullName);

person.fullName = 'uih uihui'
console.log(person.fullName);









// _____________ Try & catch  (Error handling)

let person2 = {
    fName : 'lokesh',
    lName : 'singh',

    get fullName(){
        return `${person2.fName} ${person2.lName}`;
    },

    set fullName(value){
        if(typeof value !== String){
            throw new Error("You have sent a string");
        }
        let parts = value.split(' ');
        this.fName = parts[0];
        this.lName = parts[1];
    }

}



try{
    person2.fullName = true;
}
catch(e){
    // alert("You have sent anumber in full name");
    // alert(e);
}

console.log(person2.fullName)   





// ----------------------------------------------------------------------------------





// _____________ Scope

{
    let a = 5;
    console.log(a);
}
// console.log(a);          //it will throw error message because a is not defined outside the block  (let is block scope variable)

{
    var b = 10;
}
console.log(b);




function walk(){
    var c = 5;
}
// console.log(c);         //It will throw error message because c is not defined               (var is function scope variable)
 



for(let l=0; l<5; l++){

} 
// console.log(l);        //it will throw error

for(var v=0; v<5; v++){
};
console.log(v);




if(true){
    let a =5;
}
// console.log(a);      //it will throw error

if(true){
    var v=11;
}
console.log(v);





function a(){
    const ab = 5;
}
const ab = 5;
function b(){
    const ab = 5;
}







let arr = [1,2,3,4,5];
let total = 0;

// use for of loop instead of for in loop  because it is object
for(let value of arr){
    total = total +value;
}
console.log(total);





// ------ accumulator 
let accuSum = arr.reduce((accumulator, currentValue)=> accumulator+currentValue, 0);
console.log(accuSum);

