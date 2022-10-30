//elements
const hiddenElements = document.querySelectorAll('.hidden');
const currentRound = document.querySelector('.current-round');
const userScore = document.querySelector('.score-user');
const compScore = document.querySelector('.score-comp');
const resultInfo = document.querySelector('.result-info');
const choices = document.querySelectorAll('.user-input');

const finalResult = document.querySelector('.endgame');
const endgameTitle = document.querySelector('.endgame-title');
const endgameMsg = document.querySelector('.endgame-msg');
const roundInfo = document.querySelectorAll('.game');

//game logic

let roundNum = 1;
let userChoice = '';
let compChoice = '';
let userPoints = 0;
let compPoints = 0;

function getComputerChoice() {
  const arr = ['rock', 'paper', 'scissors'];
  const randomInt = Math.floor(Math.random() * 3);
  return arr[randomInt];
}
function updateUserScoreLogResult(compChoice, userChoice) {
  userPoints++;
  userScore.textContent = userPoints;
  resultInfo.textContent = `${userChoice.toUpperCase()}(user) beats ${compChoice.toUpperCase()}(comp). User win`;
  resultInfo.style.color = 'green';
}
function updateCompScoreLogResult(compChoice, userChoice) {
  compPoints++;
  compScore.textContent = compPoints;
  resultInfo.textContent = `${compChoice.toUpperCase()}(comp) beats ${userChoice.toUpperCase()}(user). Comp win`;
  resultInfo.style.color = 'red';
}

function checkRoundWinner(compChoice, userChoice) {
  //   console.log('round:' + roundNum);
  //   console.log(compChoice, userChoice);
  roundNum++;

  if (compChoice === userChoice) {
    resultInfo.textContent = 'TIE';
    resultInfo.style.color = '#333';
  } else if (compChoice === 'rock') {
    if (userChoice === 'paper') {
      updateUserScoreLogResult(compChoice, userChoice);
    }
    if (userChoice === 'scissors') {
      updateCompScoreLogResult(compChoice, userChoice);
    }
  } else if (compChoice === 'paper') {
    if (userChoice === 'scissors') {
      updateUserScoreLogResult(compChoice, userChoice);
    }
    if (userChoice === 'rock') {
      updateCompScoreLogResult(compChoice, userChoice);
    }
  } else if (compChoice === 'scissors') {
    if (userChoice === 'rock') {
      updateUserScoreLogResult(compChoice, userChoice);
    }
    if (userChoice === 'paper') {
      updateCompScoreLogResult(compChoice, userChoice);
    }
  }
}

function checkFinalWinner(userScore, compScore) {
  roundInfo.forEach((elem) => {
    elem.classList.toggle('hide');
  });
  finalResult.classList.toggle('hide');
  if (userScore > compScore) {
    const title = 'Congrats';
    const text = 'You won ! 🏆🏆🏆';
    endgameTitle.textContent = title;
    endgameMsg.textContent = text;
  } else if (userScore < compScore) {
    const title = 'Aww..';
    const text = 'You lost 😢😢😢 ';
    endgameTitle.textContent = title;
    endgameMsg.textContent = text;
  } else {
    const title = 'Not bad, not good';
    const text = 'we have a TIE 🤝🤝🤝';
    endgameTitle.textContent = title;
    endgameMsg.textContent = text;
  }
}

//event handlers
choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    currentRound.textContent = roundNum;
    console.log('round:' + roundNum);
    if (roundNum >= 6) {
      console.log('game end');
      choices.forEach((elem) => {
        elem.disabled = true;
      });
      setTimeout(() => {
        checkFinalWinner(userPoints, compPoints);
        return;
      }, 1000);
      //   checkFinalWinner(userPoints, compPoints);
      //   return;
    }

    if (e.currentTarget.classList.contains('paper')) {
      checkRoundWinner(getComputerChoice(), 'paper');
    } else if (e.currentTarget.classList.contains('rock')) {
      checkRoundWinner(getComputerChoice(), 'rock');
    } else {
      checkRoundWinner(getComputerChoice(), 'scissors');
    }
  });
});

//on scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('.show');
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));
