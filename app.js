
const playerNameInput = document.getElementById('playerName');
const warriorNameInput = document.getElementById('warriorName');
const startButton = document.getElementById('button');
let flag = false;
startButton.addEventListener('click', function () {
if (playerNameInput.value.trim() === '' || warriorNameInput.value.trim() === '') {
  flag = false
alert('Both Player Name and Warrior Name are required.');
} else {
  flag = true;
    } 
  });


const button = document.getElementById("button")

button.onclick = () => {
    if(flag){
      location.href="warning.html"
    }
};