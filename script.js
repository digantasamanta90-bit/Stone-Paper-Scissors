let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");

const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");


const genCompChoice = () => {
    const options = ["rock","paper","scissors"];
    const randIdx = Math.floor(Math.random()*3);
    return options[randIdx];
}

const drawGame = () => {
    msg.innerText = "The game was draw. Play again"
    msg.style.backgroundColor = "gray"
}

const showWinner = (userWin, userChoice, compChoice) => {
    if(userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        console.log("you win");
        msg.innerText = `You won! your chose ${userChoice} and the computer chose ${compChoice}`;
        msg.style.backgroundColor = "green"
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        console.log("you lost");
        msg.innerText = `You lost! your chose ${compChoice} and the computer chose ${userChoice}`;
        msg.style.backgroundColor = "red"
    }
}

// const playGame = (userChoice) => {
//     console.log("user choice =", userChoice);
    
// }

// choices.forEach((choice) => {
//     console.log(choice);
//     choice.addEventListener("click", () =>{
//         const choiceId = choice.getAttribute("id");
//         console.log("choice was clicked",choiceId);
//         playGame(userChoice); 
//     })
    
// });

const playGame = (userChoice) => {
    console.log("user choice =", userChoice);
    const compChoice = genCompChoice();
    console.log("comp choice= ", compChoice);
    
    if (userChoice === compChoice){
        drawGame();
        console.log("The game is draw");
        
    }else{
        let userWin = true;
        if (userChoice==="rock"){
            userWin = compChoice === "paper" ? false:true; 
        }else if(userChoice==="paper"){
            userWin = compChoice === "scissors" ? false:true;
        }else{
            userWin = compChoice === "rock" ? false:true;
        }      
        showWinner(userWin, userChoice, compChoice);
    } 
    
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        // console.log("choice was clicked", choiceId);
        playGame(userChoice);
    });
});

