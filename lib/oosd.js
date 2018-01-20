const Game = require('./game.js');
const Background = require('./background.js');
const Cat = require('./cat.js');

$(window).ready(function(){
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);

  window.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
      game.cat.cat_state = "jump";
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

  requestAnimationFrame(game.loop());

});
