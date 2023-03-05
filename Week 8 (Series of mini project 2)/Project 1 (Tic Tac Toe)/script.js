
const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info')
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



// Function to initialise the game
function initGame(){
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];

    // ui pr empty bhi update krna padega
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialize css property again
        box.classList = `box box${index+1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}

initGame()



boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);
    })
});


function handleClick(ind){
    if(gameGrid[ind] === ""){
        boxes[ind].innerText = currentPlayer;
        gameGrid[ind] = currentPlayer;

        boxes[ind].style.pointerEvents = "none";
        // swap kro turn ko
        swapTurn();
        // Check koi jeet to nhi gaya
        chechGameOver();
    }
}



function chechGameOver(){
    let answer = "";

    winningPositions.forEach((position)=>{
        // all 3 boxes should be non-empty and exactly same in value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]])){

            // check winner
            if(gameGrid[position[0]==="X"]){
                answer = "X";
            }
            else{
                answer = 'O';
            }

            // disable point event
            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
            })

            // now we have X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner player ${answer}`;
        newGameBtn.classList.add("active"); 
        return;
    }

    // We know, No winner found Let's check whether the match is tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    });
    
    // board is filled game is TIE
    if(fillCount === 9){
        gameInfo.innerText = "Game tied";
        newGameBtn.classList.add("active");

    }
}



function swapTurn(){
    if(currentPlayer === 'X'){
        currentPlayer = 'O';
    }else{
        currentPlayer = 'X';
    }

    // UI update
    gameInfo.innerText = `currentPlayer - ${currentPlayer}`;
}


newGameBtn.addEventListener("click", initGame);

