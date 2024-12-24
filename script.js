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

// Variables
let timer = 30; // Default timer value in seconds
let interval;
let yourScore = 0;
let computerScore = 0;
let draws = 0;
let start=false;

// Choices
const options = ["rock", "paper", "scissors"];

// Event Listeners
choices.forEach(choice => {
  choice.addEventListener("click", () => {
    if (timer > 0&&start) {
      const playerChoice = choice.id;
      const computerChoice = getComputerChoice();
      const winner = determineWinner(playerChoice, computerChoice);

      // Display choices 
      playerChoiceDisplay.textContent = capitalize(playerChoice);
      computerChoiceDisplay.textContent = capitalize(computerChoice);

      // Update score and feedback
      if (winner === "You win!") {
        yourScore++;
        feedbackDisplay.textContent = "Great job! You won this round!";
      } else if (winner === "You lose!") {
        computerScore++;
        feedbackDisplay.textContent = "Oh! The computer won this round.";
      } else {
        draws++;
        feedbackDisplay.textContent = "It's a draw! Try again.";
      }

      // Update score display
      yourScoreDisplay.textContent = yourScore;
      computerScoreDisplay.textContent = computerScore;
    }else
    {
      alert("play the game first");
      return ;
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
restartButton.addEventListener("click", startTimer);//for starting timer

function resetGame() {
    start =true;
    clearInterval(interval);
    yourScore = 0;
    computerScore = 0;
    draws = 0;
    playerChoiceDisplay.textContent = "";
    computerChoiceDisplay.textContent = "";
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
    resetGame();
  } else {
    alert("Invalid input. Please enter a positive number.");
  }
  start=false;
});


// Timer
function startTimer() {
  if(timer<=0)  
  {
    alert("set timer first");
    return;
  }
  timerDisplay.textContent = `${timer}s`;
  interval = setInterval(() => {
   timer--;
  timerDisplay.textContent = `${timer}s`;

    if (timer <= 0) {
      clearInterval(interval);
      declareFinalWinner();
      restartButton.innerHTML="play again";
    }
  }, 1000);
}

// Get computer's choice
function getComputerChoice() {
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}



// Capitalize first letter
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Declare final winner
function declareFinalWinner() {
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
}





