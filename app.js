

const buttonm = document.getElementById("button")

button.onclick = () => {
    location.href = "./warning.html";
  };

  

function playsound(audioName,loop){
  let audio = new Audio(audioName)
  audio.loop = loop
  audio.play();
}
playsound("startingmusic.mp3",true)