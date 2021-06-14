// Laat alleen de eerste user zien

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

const likeButton = document.getElementById("voetbal");

function soundSignal() {
  const audio = new Audio("./sound/FluitSignaal.mp3");
  audio.play();
}
likeButton.addEventListener("click", soundSignal);

setTimeout(soundSignal, 10000);
