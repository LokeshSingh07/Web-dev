
const countValue = document.querySelector('#counter');



const increment = ()=>{
    // get the value form UI
    let value  = parseInt(countValue.innerText);
    // udate the value
    value += 1;

    // set the value into UI
    countValue.innerText = value;
}

const decrement = ()=>{
        // get the value form UI
        let value  = parseInt(countValue.innerText);
        // udate the value
        value -= 1;
    
        // set the value into UI
        countValue.innerText = value;
}































