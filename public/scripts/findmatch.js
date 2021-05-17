const main = document.getElementsByTagName('main')[1];
const main2 = document.getElementsByTagName('main')[2];
const main3 = document.getElementsByTagName('main')[3];
const buttons = document.getElementsByClassName('buttons')[1];
const buttons2 = document.getElementsByClassName('buttons')[2];
const buttons3 = document.getElementsByClassName('buttons')[3];
const buttons4 = document.getElementsByClassName('buttons')[4];
const buttons5 = document.getElementsByClassName('buttons')[5];

function display() {
  main.style.display = 'none';
  main2.style.display = 'none';
  main3.style.display = 'none';
  buttons.style.display = 'none';
  buttons2.style.display = 'none';
  buttons3.style.display = 'none';
  buttons4.style.display = 'none';
  buttons5.style.display = 'none';
}

display();


// let i = array.length;
// const array = document.getElementsByTagName('main')[i];
// function display2() {
//   if (i = 0) {
//     console.log('Niks om te verbergen');
//   } else {
//     array[i].style.display = 'none';
//   }
// }

// display2();
