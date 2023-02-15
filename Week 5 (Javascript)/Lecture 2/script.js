

// ________________ object create
/*
const rectangle = {
    length : 2,
    breadth : 3,

    draw : function(){
        console.log('kya haal chal')
    }
}
console.log(rectangle);
*/





// ----------------------------------------------------------------------------------





// ________________ factory function
/*
function createRectangle(len, brea){

    return rectangle = {
        // length : len,
        // breadth : brea,
        len,
        brea,
    
        draw : function(){
            console.log('factory function called')
        }
    }
}


let rectangleObj1 = new createRectangle(56, 75);
console.log(rectangleObj1);

let rectangleObj2 = new createRectangle(6, 3);
console.log(rectangleObj2);

*/





// ----------------------------------------------------------------------------------





// ________________ Constructor function

// follow Pascal notation --(first letter of every word is capital - [NumberOfStudent] )
/*
function RectangleConst(){
    this.length = 1;
    this.breadth = 2;

    this.draw = function(){
        console.log('Constructor function is called...')
    }
}

let rectangleObject = new RectangleConst();
console.log(rectangleObject);





// Dynamic nature of object
// add property in object
rectangleObject.color = 'yellow';
console.log(rectangleObject);

// Remove property from object
delete rectangleObject.color;
console.log(rectangleObject);

*/





// ----------------------------------------------------------------------------------





// ------ function is also an object and har object ka ek constructor hoga
/*
let Rectangle1 = new Function(
    'len','bre',
    `this.length = len;
    this.breadth = bre;
    this.draw = function(){
        console.log('drawing');
}`);

// object created using rectangle1
let rect = new Rectangle1(2,3);
console.log(rect);
*/





// ----------------------------------------------------------------------------------





// _______________ Types in js
/*

// primitive
function incre(a){
    a++;
}

let a = 10;
incre(a);

console.log(a);



// reference
function increment(a){
    a.value++;
}

let b = {value : 20}
increment(b);
console.log(b.value);
*/





// ----------------------------------------------------------------------------------





// ________________ iteration through object
/*
let rectangle3 = {
    length : 1,
    breadth: 5
}

// for-in loop  - (iteration on object)
for(let key in rectangle3){
    // keys are reflected through key variable 
    // values are reflected through rectangle[key]
    console.log(key , rectangle3[key]);
}



// for-of-loop

// hack for accessing object using for-of-loop
for(let key of Object.keys(rectangle3)){
    console.log(key);
}
for(let key of Object.entries(rectangle3)){
    console.log(key);
}



// Iteration on array - (for-of -> iteration on arrays)
let array = [2,4,6,2];

for(let key of array){
    console.log(key); 
}



if('color' in rectangle3){
    console.log('present');
}
else{
    console.log('absent');
}

*/





// ----------------------------------------------------------------------------------





// ________________ Object cloning
/*
// iteration
let src1 = {
    a : 10,
    b : 33,
    c : 14
};
let dest1 = {};

for(let key in src1){
    dest1[key] = src1[key];
}
console.log(dest1);


// assign
let src2 = {
    a:10,
    b:44,
    c:45
};
let src3={value:44};

let dest2 = Object.assign({},src2,src3);

console.log(dest2);


// spread
let src4 = {
    a:2,
    b:4,
    c:44
};

let dest3 = {...src4};

console.log(dest3);

*/








