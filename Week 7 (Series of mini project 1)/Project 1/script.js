

const inputSlider = document.querySelector('[data-rangeSlider]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = "~!@#$%^&*()[]{}:;,.'?/\|";




let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
// set strength circle color to grey





// set password length
function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    // console.log("handle slider");
} 



function setIndicator(color){
    indicator.style.backgroundColor = color;
    // shadow
}





function getRndInteger(min, max){
    return Math.floor((Math.random() * (max-min)) + min); 
}

function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const random = getRndInteger(0, symbols.length);
    return symbols.charAt(random);
}





function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;

    if(uppercaseCheck.checked) hasUpper = true;
    if(lowercaseCheck.checked) hasLower = true;
    if(numbersCheck.checked) hasNum = true;
    if(symbolsCheck.checked) hasSym = true;

    if(hasUpper && hasLower && (hasNum || hasSym) && passwordLength>=8){
        setIndicator('#0f0');
    }else if((hasLower||hasUpper) && (hasNum||hasSym) && passwordLength>=6){
        setIndicator('#ff0');
    }
    else{
        setIndicator('#f00');
    }

}



async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = 'Copied';

    }
    catch(e){
        copyMsg.innerText = 'failed';
    }

    // copy wala span visible ho jayega
    copyMsg.classList.add('active');

    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000);
}



function shufflePassword(array){
    // fisher yates method
    for(let i=array.length-1 ; i>0 ; i--){
        const j = Math.floor(Math.random() * (i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = " ";
    array.forEach((el)=>(str += el));
    return str;
}




function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
};



allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change', handleCheckBoxChange);
})




inputSlider.addEventListener('input', (e)=>{
    passwordLength = e.target.value;
    console.log("input");
    handleSlider();
});



copyBtn.addEventListener('click', ()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});



generateBtn.addEventListener('click',()=>{
    // none of the checked box are selected

    // if(checkCount==0) return;
    // console.log("fd");
    
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    // let's start the jouney to find the password

    // remve old password
    password="";

    // let's put the stuff mentioned by the checkboxes
    // if(uppercaseCheck.checked){
    //     password += generateUpperCase();
    // }
    // if(lowercaseCheck.checked){
    //     password += generateLowerCase();
    // }
    // if(symbolsCheck.checked){
    //     password += generateSymbol();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }



    let funcArr = [];

    if(uppercaseCheck.checked){
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowerCase);
    }    
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    } 
    if(symbolsCheck.checked){
        funcArr.push(generateSymbol);
    }


    // complusory addition
    for(let i=0; i<funcArr.length; i++){
        password += funcArr[i]();
    }

    // remaining addition
    for(let i=0; i<passwordLength-funcArr.length; i++){
        let randIndex = getRndInteger(0, funcArr.length);
        password += funcArr[randIndex]();
    }
    

    // shuffle the password
    password = shufflePassword(Array.from(password));

    // show in UI
    passwordDisplay.value = password;

    calcStrength();


});