let allElements = document.querySelectorAll('.match');
let allButtons = document.querySelectorAll('.buttons');

// Laat alleen de eerste user zien
function displayMain() {
  for (let i = 1; i < allElements.length; i++) {
    allElements[i].style.display = 'none';
    allButtons[i].style.display = 'none';
  }
}
displayMain();
