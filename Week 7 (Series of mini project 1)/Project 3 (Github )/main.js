
// variables
let input = document.querySelector(`[user-input]`);
let btnSubmit = document.querySelector(`[btn-submit]`);

// let userVal = 'lokeshsingh7';


btnSubmit.addEventListener('click', ()=>{
    if(input.value !== ""){
        fetchUserInfo(input.value);
    }
    
})

input.addEventListener("keydown",(e)=>{
    if(e.key == 'Enter'){
        if(input.value !== ""){
            fetchUserInfo(input.value);
        }
    }
})



// Fetch user details
async function fetchUserInfo(user){

    // API call
    try{
        const res = await fetch(`https://api.github.com/users/${user}`);
        const data = await res.json();

        renderUserInfo(data);
    }
    catch(e){
        document.write(e);
    }
}

function renderUserInfo(userInfo){
    // firstly we have to fetch the elemnts
    
    console.log(typeof userInfo);    
    console.log(userInfo);

}
















