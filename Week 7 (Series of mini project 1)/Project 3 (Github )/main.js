
// variables
let input = document.querySelector(`[user-input]`);
let btnSubmit = document.querySelector(`[btn-submit]`);
let container = document.querySelector(".user-container")
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
        // alert(e);
    }
}


function linksUi(param2){
    if(param2.style.opacity == 1){
        param2.style.opacity = 0.5;
        param2.style.cursor = "none";
    }
    else{
        param2.style.opacity = 1;
        param2.style.cursor = "pointer";
    }
}



function renderUserInfo(data){

    if(data.message !== "Not Found"){

        function checkNull(param1, param2){
            if(param1 === "" || param1 === null){
                linksUi(param2);
                return true;
            } 
            else{
                return false;
            }
        }


            // firstly we have to fetch the elements
        let avatar = document.querySelector('.user-img');
        let userName = document.querySelector("[user-name]");
        let userId = document.querySelector("[user-id]");
        let dateJoined = document.querySelector("[created-at]");
        let bioDetails = document.querySelector("[bio-details]")
        let publicRepo = document.querySelector("[public-repo]");
        let followers = document.querySelector("[followers]");
        let following = document.querySelector("[following]");
        let location = document.querySelector("[location]");
        let blog = document.querySelector("[blog]");
        let email = document.querySelector("[email]");
        let company = document.querySelector("[company]");

        // render on UI
        container.classList.add("active");
        avatar.src = `${data?.avatar_url}`;
        userName.innerText = `${data?.name}`;
        userId.innerText= `@${data?.login}`;
        userId.href= `${data?.html_url}`;
        dateJoined.innerText = `${data?.created_at}`
        bioDetails.innerText = `${data.bio==null ? "This profile has no bio" : data?.bio}`;
        publicRepo.innerText = `${data?.public_repos}`;
        followers.innerText = `${data?.followers}`;
        following.innerText = `${data?.following}`;
        location.innerText = `${checkNull(data?.location, location) ? "Not available" : data?.location}`;
        blog.innerText = `${checkNull(data?.blog, blog) ? "Not available" : data?.blog}`;
        blog.href = `${checkNull(data?.blog, blog) ? "#" : data?.blog}`;
        email.innerText = `${checkNull(data?.email, email) ? "Not available" : data?.email}`;
        email.href = `${checkNull(data?.email, email) ? "#" : data?.email}`;
        company.innerText = `${checkNull(data?.company, company) ? "Not available" : data?.company}`;
        company.href = `${checkNull(data?.company, company) ? "#" : data?.company}`;
        
        // console.log(userInfo);
    }
    else{
        alert("invalid user");
    }
   

}


