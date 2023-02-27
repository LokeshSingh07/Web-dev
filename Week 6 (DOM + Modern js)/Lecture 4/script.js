// Javascript is single threaded language


// -- sync code example
function syncExp(){
    console.log('first of sync example');
}
syncExp();
console.log(`second of sync example`);



// -- Async code example
setTimeout(function(){
    console.log(`third of async example`);
});

function sync(){
    console.log('first of async example');
}
sync();
console.log(`second of async example`);









// ______________ Promises in JS

let meraPromise1  = new Promise((resolve, reject)=>{
    console.log(`I am inside promise 1`);
    resolve(1998);
});
console.log('phle 1');




let meraPromise2 = new Promise((resolve, reject)=>{
    console.log("I am inside promise 2");
    resolve(22);
});
console.log("phle 2");

let meraPromise3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log("I am inside promise 3");
    },2000);
    resolve(22);
    // reject(new Error("Birro error aaye h"));
});
console.log("phle 3");




// ----- then & catch method
let meraPromise4 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log('I am inside promise 4');
    },4000);
    
    // resolve("Promise fulfill ho gaya h");
    reject(new Error('Bhaisahab Error aye h'));
});

meraPromise4.then((value)=>{
    console.log(value);
})
meraPromise4.catch((e)=>{
    console.log("Received an error");
})

// meraPromise4.then((value)=>{console.log(value)}, (err)=>{console.log("Received an error")});









// ______________ Promises  -- chaining
let meraWadda1 = new Promise((res,rej)=>{
    setTimeout(()=>{
        console.log("Set timeout 1 started");
    },2000);
    res(true);
})

let output = meraWadda1.then(()=>{
    let wadda2 = new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("Set timeout 2 started");
        },3000);
        res("wadda 2 resolved");
        // res(true);
    })
    return wadda2;
})

output.then((value)=>{
    console.log(`${value} : promise1 -> promise2 -> then`);
})









// ______________ Async & Await

// Async
async function abcd(){
    return 'Kya hua tera wadda 😂😂';
}

console.log(abcd());




// Await
async function utility(){
    let delhiMausum = new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve('Delhi me nhut grmi h 🔥');
        },5000);
    });
    
    let hydMausum = new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve('Hyderbad is cool 😎');
        },10000);
    });


    let dM = await delhiMausum;
    let hM = await hydMausum;

    return [dM, hM];
} 










// ______________ Fetch API

// -- Retrieve data through fetch api
async function retrieve(){
    let content = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    let output = await content.json();

    console.log(output);
}
retrieve();



// -- send data through fetch api
async function helper(){
    let options = {
        method: 'POST',
        body: JSON.stringify({
          title: 'Gabbar',
          body: 'Hello jii',
          userId: 30,
          weight : 70,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
    }
    
    let content = await fetch('https://jsonplaceholder.typicode.com/posts', options);
    let response = await content.json();
    return response;
};


async function utility(){
    let ans = await helper();
    console.log(ans);
}
utility();









// ______________ CLOSURE
function init(){
    let name = "Mozilla";
    
    function displayName(){
        // displayName is the inner function, that forms the closure
        console.log(name);      //use variable declared in the parent function
    }
    return displayName();
}
init();


