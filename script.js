let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const resultBadge = document.querySelector("#result-badge");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const userSlot = document.querySelector("#user-slot");
const compSlot = document.querySelector("#comp-slot");
const userMoveName = document.querySelector("#user-move-name");
const compMoveName = document.querySelector("#comp-move-name");
const resetBtn = document.querySelector("#reset-btn");

const choiceIcons = {
    rock: "fa-hand-back-fist",
    paper: "fa-hand",
    scissors: "fa-hand-scissors"
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const updateDuelArena = (userChoice, compChoice) => {
    userSlot.innerHTML = `<i class="fa-solid ${choiceIcons[userChoice]}"></i>`;
    compSlot.innerHTML = `<i class="fa-solid ${choiceIcons[compChoice]}"></i>`;
    userMoveName.innerText = userChoice.toUpperCase();
    compMoveName.innerText = compChoice.toUpperCase();

    // Trigger pop animation
    userSlot.classList.remove("pop");
    compSlot.classList.remove("pop");
    void userSlot.offsetWidth;
    userSlot.classList.add("pop");
    compSlot.classList.add("pop");
};

const drawGame = (userChoice) => {
    resultBadge.innerText = "IT'S A DRAW!";
    resultBadge.className = "result-badge draw";
    msg.innerText = `Both picked ${capitalize(userChoice)}. No points awarded!`;
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        resultBadge.innerText = "YOU WIN!";
        resultBadge.className = "result-badge win";
        msg.innerText = `${capitalize(userChoice)} beats ${compChoice}! Point to you.`;
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        resultBadge.innerText = "YOU LOSE!";
        resultBadge.className = "result-badge lose";
        msg.innerText = `${capitalize(compChoice)} beats ${userChoice}. Computer scores!`;
    }
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();

    updateDuelArena(userChoice, compChoice);

    if (userChoice === compChoice) {
        drawGame(userChoice);
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    userScorePara.innerText = "0";
    compScorePara.innerText = "0";

    userSlot.innerHTML = `<i class="fa-solid fa-question"></i>`;
    compSlot.innerHTML = `<i class="fa-solid fa-question"></i>`;
    userMoveName.innerText = "-";
    compMoveName.innerText = "-";

    resultBadge.innerText = "Choose your move to begin!";
    resultBadge.className = "result-badge";
    msg.innerText = "First to score wins the round.";
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

if (resetBtn) {
    resetBtn.addEventListener("click", resetGame);
}
