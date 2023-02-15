

let number = [1,32,5,3];
console.log(number);

/*
// end
number.push('a');
console.log(number);

// beginning
number.unshift(22);
console.log(number);

// middle
number.splice(2,0,'c','f','d');
console.log(number);

*/


/*
console.log(number.indexOf(5));

console.log(number.includes(5));

console.log(number.indexOf(4,2));
*/






let courses = [
    {no: 1, naam: 'lokesh'},
    {no: 2, naam: 'rohni'}

];

console.log(courses);

// console.log(course.indexOf({no:1, naam: 'lokesh'}));


// let cour = courses.find(function(course){
//     return course.naam=='lokesh';
// });

let cour = courses.find((course) => {
    return course.naam=='lokesh';
});




console.log(cour);


















