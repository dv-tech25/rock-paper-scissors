// Elements
const choices = document.querySelectorAll(".choice");
const playerChoiceDisplay = document.querySelector("#player-choice");
const computerChoiceDisplay = document.querySelector("#computer-choice");
const winnerDisplay = document.querySelector("#winner");
const yourScoreDisplay = document.querySelector("#your-score");
const computerScoreDisplay = document.querySelector("#computer-score");
const timerDisplay = document.querySelector("#timer");
const feedbackDisplay = document.querySelector("#feedback");
const restartButton = document.getElementById("restart");
const setTimerButton = document.getElementById("set-timer");
const summaryDisplay = document.getElementById("summary");
const container = document.querySelector(".container");
const final = document.querySelector(".finalresult");
const result = document.querySelector(".result");
const computer_icon = document.querySelector(".computer-icon");
const player_icon = document.querySelector(".player-icon");
const icon = document.querySelector(".iconClass");
const btnText = document.querySelector(".button-text");
// Variables
let timer = 30; // Default timer value in seconds
let temp = 30;
let interval;
let yourScore = 0;
let computerScore = 0;
let draws = 0;
let start = false;

// Choices
const options = ["rock", "paper", "scissors"];

// Event Listeners
function showIcon(playerChoice, computerChoice) {
  // Update player icon based on playerChoice
  if (playerChoice === "rock") {
    player_icon.src = "rock-neon-icons.png";
    player_icon.classList.remove("motion2", "motion3");
    player_icon.classList.add("motion1");
  } else if (playerChoice === "paper") {
    player_icon.src = "paper-neon-icons.png";
    player_icon.classList.remove("motion1", "motion3");
    player_icon.classList.add("motion2");
  } else if (playerChoice === "scissors") {
    player_icon.src = "scissors-neon-icons.png";
    player_icon.classList.remove("motion1", "motion2");
    player_icon.classList.add("motion3");
  }

  // Update computer icon based on computerChoice
  if (computerChoice === "rock") {
    computer_icon.src = "rock-neon-icons.png";
    computer_icon.classList.remove("motion2", "motion3");
    computer_icon.classList.add("motion1");
  } else if (computerChoice === "paper") {
    computer_icon.src = "paper-neon-icons.png";
    computer_icon.classList.remove("motion1", "motion3");
    computer_icon.classList.add("motion2");
  } else if (computerChoice === "scissors") {
    computer_icon.src = "scissors-neon-icons.png";
    computer_icon.classList.remove("motion1", "motion2");
    computer_icon.classList.add("motion3");
  }
}

choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (timer > 0 && start) {
      const playerChoice = choice.id;
      const computerChoice = getComputerChoice();

      showIcon(playerChoice, computerChoice);

      computer_icon.style.display = "block";
      player_icon.style.display = "block";

      const winner = determineWinner(playerChoice, computerChoice);
    // Update score and feedback
      if (winner === "You win!") {
        document.getElementById("win").play();
        yourScore++;
        feedbackDisplay.textContent = " You win";
        feedbackDisplay.style.color = "greenyellow";

      } else if (winner === "You lose!") {
        document.getElementById("loose").play();
        computerScore++;
        feedbackDisplay.textContent = "You loose";
        feedbackDisplay.style.color = "rgb(255, 200, 47)";
      } else {
        document.getElementById("draw").play();
        draws++;
        feedbackDisplay.textContent = "draw! ";
        feedbackDisplay.style.color = "red";
      }

      // Update score display
      yourScoreDisplay.textContent = yourScore;
      computerScoreDisplay.textContent = computerScore;

    } else {
      alert("Press play button");
      return;
    }
  });
});

// Determine winner
function determineWinner(player, computer) {
  if (player === computer) return "It's a draw!";
  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "You win!";
  }
  return "You lose!";
}




// Restart game
restartButton.addEventListener("click", resetGame);// for reseting game

restartButton.addEventListener("click", () => {
  document.getElementById("start").play();
  start = !start;
  if (start) {

    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");
    btnText.textContent = "Restart";
  } else {

    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");
    btnText.textContent = "Play";
  }


});
//for starting timer
document.getElementById("btn").addEventListener("click", () => {

  resetGame();

  final.classList.remove("show");
  document.getElementById("btn").style.display = "none";
})
function resetGame() {

  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
  btnText.textContent = "Play";
  clearInterval(interval);
  timer = temp;
  yourScore = 0;
  computerScore = 0;
  draws = 0;
  computer_icon.style.display = "none";
  player_icon.style.display = "none";
  winnerDisplay.textContent = "";
  feedbackDisplay.textContent = "";
  summaryDisplay.textContent = "";
  yourScoreDisplay.textContent = yourScore;
  computerScoreDisplay.textContent = computerScore;
  timerDisplay.textContent = `${timer}s`;
}



// Set timer
setTimerButton.addEventListener("click", () => {

  const userTime = prompt("Enter timer duration in seconds:");
  if (userTime && !isNaN(userTime) && userTime > 0) {
    timer = parseInt(userTime);
    temp = timer;
    resetGame();
  } else {
    alert("Invalid input. Please enter a positive number.");
  }
  start = false;
});

restartButton.addEventListener("click", startTimer);//for starting timer
// Timer
function startTimer() {
  if (timer <= 0) {
    alert("Set timer first");
    return;
  }
  timerDisplay.textContent = `${timer}s`;
  if (start) {
    interval = setInterval(() => {
      timer--;
      timerDisplay.textContent = `${timer}s`;

      if (timer <= 0) {
        clearInterval(interval);
        declareFinalWinner();

      }
    }, 1000);
  }
}

// Get computer's choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

// Declare final winner
function declareFinalWinner() {
  start = !start;
  computer_icon.style.display = "none";
  player_icon.style.display = "none";
  summaryDisplay.innerHTML = `
    Game Over! <br>
    Final Scores: <br>
    You: ${yourScore} | Computer: ${computerScore} | Draws: ${draws}
  `;
  if (yourScore > computerScore) {
    winnerDisplay.textContent = "You are the champion!";
  } else if (yourScore < computerScore) {
    winnerDisplay.textContent = "The computer wins!";
  } else {
    winnerDisplay.textContent = "It's a tie overall!";
  }
  feedbackDisplay.textContent = "";
  container.classList.add("hidden");
  final.classList.add("show");
  document.getElementById("btn").style.display = "block";
  document.getElementById("game-over").play();

}








