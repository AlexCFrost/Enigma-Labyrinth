document.addEventListener("DOMContentLoaded", function () {

  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext("2d")
  
  var tileSize = 25;
  
  canvas.height = tileSize * 22;
  canvas.width = tileSize * 20;
  
  const player = {
    x: canvas.width - tileSize,
    y: canvas.height - (tileSize*5),
    radius: tileSize/4,
    prevPos: {}
  };
  
  var animation;
  
  var rightPressed = false;
  var leftPressed = false;
  var upPressed = false;
  var downPressed = false;

  // The matrix for maze game "1" denotes wall, "0" denotes path.

  const map = [
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,1,1,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,1,1,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,1,1,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,0,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
    
  ];
  
  var tiles = [];
    for (var i = 0;i<map.length; i++){
      tiles[i] = [];
      for(var j=0; j <map[i].length; j++){
        tiles[i][j] = {x:0, y:0, type: ""};
      }
    };

    //To draw the background 
  
  function drawBoard() {
   ctx.fillStyle="#03011f"; 
   ctx.fillRect(0,0,canvas.width,canvas.height);
  }

  // TO draw the maze
  
  function drawMaze(){
    for (var i = 0;i<map.length; i++){
      for(var j=0; j <map[i].length; j++){
        var tileX = j * tileSize;
        var tileY = i * tileSize;
        tiles[i][j].x = tileX;
        tiles[i][j].y = tileY;
        if (map[i][j] === 1){
          tiles[i][j].type = "wall";
          drawWall(tileX, tileY);
        } else {
          drawEmpty(tileX,tileY);
        }
      }
    }
  }

  // TO draw the wall
  
  function drawWall(x,y){
    ctx.fillStyle = "#6cacc5";
    ctx.fillRect(x,y,tileSize,tileSize);
  }
  
// To draw the path

  function drawEmpty(x, y){
    ctx.fillStyle = "#03011f";
    ctx.fillRect(x, y, tileSize, tileSize);
  }

  // To draw the player
  
  function drawPlayer(){
    ctx.beginPath();
    ctx.arc(player.x + tileSize/2,player.y+tileSize/2,player.radius, 0, 2 * Math.PI);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  
  function updatePosition(){
    player.prevPos = {x: player.x, y: player.y};
    if (rightPressed){
      player.x += 2;
    }
    if (leftPressed){
      player.x -= 2;
    }
    if (upPressed){
      player.y -= 2;
    }
    if (downPressed){
      player.y += 2;
    }
  }
  
  function checkCollision(){
    if (player.x + tileSize > canvas.width){
      console.log("Warrior's starting position!");
      player.x = player.prevPos.x;
    }
    if (player.y + player.radius < 0){
      console.log("Hehehe you won kid!");
      cancelAnimationFrame(animation);
      gameOver();
    }
    for(var i=0; i<map.length; i++) {
      for(var j=0; j<map[i].length; j++) {
        var b = tiles[i][j]; 
        if(player.x+player.radius * 3 > b.x && player.x < b.x + tileSize  - player.radius && player.y + tileSize > b.y + player.radius && player.y < b.y + tileSize - player.radius && b.type === "wall") {
          
            player.x = player.prevPos.x;
            player.y = player.prevPos.y;
          
        }
      }
    }
    
   
  }
  
  function gameOver(){
    window.location.href='gameover.html'
  }
  
  document.addEventListener("keydown", function(e){
    if(e.keyCode === 37){
      leftPressed = true;
    } else if (e.keyCode === 39){
      rightPressed = true;
    } else if (e.keyCode === 38){
      upPressed = true;
    } else if (e.keyCode === 40){
      downPressed = true;
    }
  })
  
  
  
  document.addEventListener("keyup", function(e){
    if(e.keyCode === 37){
      leftPressed = false;
    } else if (e.keyCode === 39){
      rightPressed = false;
    } else if (e.keyCode === 38){
      upPressed = false;
    } else if (e.keyCode === 40){
      downPressed = false;
    }
  })
  
  function update(){
    updatePosition();
    drawBoard();
    drawMaze();
    
    drawPlayer();
    checkCollision();
    animation = requestAnimationFrame(update);
  }
  
  animation = requestAnimationFrame(update);
});