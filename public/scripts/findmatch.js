// Laat alleen de eerste user zien
// https://stackoverflow.com/questions/10308993/jquery-how-to-get-the-first-list-item-with-displaynone

const allElements = document.querySelectorAll(".match");
const allButtons = document.querySelectorAll(".buttons");

function displayMain() {
  for (let i = 1; i < allElements.length; i++) {
    allElements[i].style.display = "none";
    allButtons[i].style.display = "none";
  }
}
displayMain();

// Speelt een fluitje af bij het liken
// https://stackoverflow.com/questions/9419263/how-to-play-audio

const likeButton = document.getElementById("voetbal");

function soundSignal() {
  const audio = new Audio("./sound/FluitSignaal.mp3");
  audio.play();
}
likeButton.addEventListener("click", soundSignal);
