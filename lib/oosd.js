const Game = require('./game.js');
const Background = require('./background.js');
const Cat = require('./cat.js');

$(window).ready(function(){
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);
  const jumpSound = new Audio('./assets/sounds/jump.mp3');


  window.addEventListener("keypress", function(e) {
    if (e.keyCode == 32) {
      e.preventDefault();
      game.cat.cat_state = "jump";
      if (game.cat.cat_loc_y >= 269) {
        jumpSound.play();
      }
    }
  });

  window.addEventListener("keyup", function(e) {
    if (e.keyCode == 32) {
      game.cat.cat_state = "fall";
    }
  });

  window.addEventListener("keydown", function(e) {
    if (e.keyCode == 80) {
      game.togglePauseGame();
    }
  });

  window.addEventListener("keydown", function(e) {
    if (e.keyCode == 82) {
      game.restart();
    }
  });

  requestAnimationFrame(game.loop());

});
