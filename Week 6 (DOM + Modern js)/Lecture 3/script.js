
// adding para
let t1 = performance.now();
for(let i=0; i<20; i++){
    let newElement = document.createElement('p');
    newElement.textContent = `This is para ${i+1} `;

    document.body.appendChild(newElement);
}
let t2 = performance.now();
console.log(`This took ${t2-t1}     --adding para `);




// optimising a bit 
let t3 = performance.now();
let myDiv = document.createElement('div');
for(let i=0; i<20; i++){
    let newElement = document.createElement('p');
    newElement.textContent = `This is para ${i+1} `;

    myDiv.appendChild(newElement);
}
document.body.appendChild(myDiv);

let t4 = performance.now();

console.log(`This took ${t4-t3}     --optimising a bit `);








// ______________ Document Fragment
let t5 = performance.now();
let fragment = document.createDocumentFragment();
for(let i=0; i<20; i++){
    let newElement = document.createElement('p');
    newElement.textContent = `This is para ${i+1} `;

    fragment.appendChild(newElement);
}
document.body.appendChild(fragment);    // 1 reflow and 1 repaint

let t6 = performance.now();
console.log(`This take ${t6-t5}     --document fragment `);








// ______________ Call stack   -- (single threaded)
function addPara(){
    let para = document.createElement('p');
    para.textContent = 'JS is single';

    document.body.appendChild(para);
}

function appendNewMessage(){
    let para = document.createElement('p');
    para.textContent = 'kya haal chal';

    document.body.appendChild(para);
}


addPara();
appendNewMessage();



document.addEventListener('click', ()=>{
    console.log('hello jii');
});








// ______________ setTimeout function

setTimeout(() => {
    console.log("Hello Everyone... ")
}, 5000);

// will print after 5 sec 








// _________ ( Philip roberts javascript Event Loop ) _________ 
// http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D
// https://www.youtube.com/watch?v=8aGhZQkoFbQ


