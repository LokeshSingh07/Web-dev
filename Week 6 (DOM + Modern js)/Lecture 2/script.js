

// _____________ EventListener

// ----- addEventListener
document.addEventListener('click', function(){
    console.log("--I have clicked on documnent.");
});


function eventFunction(){
    console.log("key is pressed.");
}
document.addEventListener('keypress', eventFunction);



let content1 = document.querySelector('.heading');
console.log(content1);

content1.addEventListener('click', function(){
    content1.style.background = 'lightblue'
});   



          

// ----- remove addEventListner

// document.addEventListener('click', function(){
//     console.log("I have clicked on documnent");
// });
// document.removeEventListener('click', function(){
//     console.log("I have clicked on documnent");
// });


// same target, same type and same function  -- (hona chahiye wrna kaam nhi karega)
function eventFunction(){
    console.log("I have clicked on document");
}
document.addEventListener('click', eventFunction);
document.removeEventListener('click', eventFunction);








// _____________ Event Object
const content = document.querySelector('#wrapper');

content.addEventListener('click', function(hii){
    console.log(hii);
});








// _____________ Prevent default
let links = document.querySelectorAll('a');
let thirdLink = links[2];

thirdLink.addEventListener('click' , (event)=>{
    event.preventDefault();
    console.log("Prevent defaut clicked");
})








// _____________ Avoid two many Events
let myDiv = document.createElement('div');

let paraStatus = function(eve){
    console.log("I have clicked on para , " + eve.target.textContent);
}

myDiv.addEventListener('click', paraStatus);


for(let i=0; i<10; i++){
    let newElement = document.createElement('p');
    newElement.textContent = `This is para ${i+1} `; 
    
    // newElement.addEventListener('click', paraStatus); 

    myDiv.appendChild(newElement);
}
document.body.appendChild(myDiv);








// _____________ Event target property
let elements = document.querySelector("#arti");
elements.addEventListener('click', (eve)=>{
    if(eve.target.nodeName === 'SPAN'){
        console.log("span pr click kiey ha ," + eve.target.textContent);
    }
})


