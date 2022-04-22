const wordRender = document.querySelector(".word");
const result = document.querySelector(".result");
const nextWordButton = document.querySelector(".nextWord");
const scoreF = document.querySelector(".score");
const buttons = [...document.querySelectorAll(".keyboard--key")];

let wordList = List;
let sizeOfGallows = 0;
let score = 0;

for (let i = 0; i < wordList.length; i++) {
  wordList[i] = wordList[i].toUpperCase();
}

function GetAWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
function GenerateFileds(e) {
  for (let i = 0; i < e.length; i++) {
    const element = document.createElement("div");
    wordRender.appendChild(element);
    if (e[i] == " ") element.classList.add("emptySpace");
    else element.classList.add("letter");
  }
  return [...document.querySelectorAll(".word div")];
}
function CountLettersInString(array) {
  let counter = 0;
  for (let i = 0; i < array.length; i++)
    if (array[i].classList.contains("letter")) counter++;
  return counter;
}

function CheckLetter(letter, word, fields) {
  let isLetterInWord = false;
  for (let i = 0; i < word.length; i++) {
    if (word[i] == letter) {
      fields[i].innerHTML = letter;
      isLetterInWord = true;
    }
  }
  if (!isLetterInWord) {
    sizeOfGallows++;
    DrawImage(sizeOfGallows);
  }
}
function DrawImage(size) {
  result.innerHTML = `Number of attempts remaining  ${6 - size}`;
}

function CountEnteredLetters(array) {
  let counter = 0;
  for (let i = 0; i < array.length; i++)
    if (array[i].innerHTML != "") counter++;
  return counter;
}

function CheckWin(letters, wordLetters) {
  if (letters == wordLetters) return true;
}

function removeWordFromWordList(word) {
  for (let i = 0; i < wordList.length; i++) {
    if (word == wordList[i]) wordList.splice(i, 1);
  }
}

function gameStart() {
  let word = GetAWord();
  let fields = GenerateFileds(word);
  let numberOfLetters = CountLettersInString(fields);
  let pressLetter = CountEnteredLetters(fields);
  console.log(word);
  buttons.forEach((e) => {
    e.addEventListener("click", function () {
      if (pressLetter != numberOfLetters && sizeOfGallows != 6) {
        CheckLetter(e.innerHTML, word, fields);
        pressLetter = CountEnteredLetters(fields);
        if (CheckWin(pressLetter, numberOfLetters)) {
          result.innerHTML = `Correct`;
          score++;
          scoreF.innerHTML = `Your Score:  ${score}`;
        }
        if (sizeOfGallows == 6) {
          result.innerHTML = `You lose`;
        }
        e.style.visibility = "hidden";
      }
    });
  });

  function nextWord() {
    removeWordFromWordList(word);
    if (wordList.length) {
      sizeOfGallows = 0;
      result.innerHTML = "";
      buttons.forEach((e) => {
        e.style.visibility = "visible";
      });
      fields.forEach((e) => {
        e.remove();
      });
      word = GetAWord();
      console.log(word);
      fields = GenerateFileds(word);
      numberOfLetters = CountLettersInString(fields);
      pressLetter = CountEnteredLetters(fields);
    } else {
      result.innerHTML = "No more words";
    }
  }
  nextWordButton.addEventListener("click", nextWord);
}
document.addEventListener("DOMContentLoaded", gameStart);
