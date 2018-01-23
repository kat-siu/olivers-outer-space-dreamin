const Game = require('./game.js');
const Background = require('./background.js');
const Cat = require('./cat.js');

$(window).ready(function(){
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);
  const jumpSound = new Audio('./assets/sounds/jump.mp3');


  window.addEventListener("keypress", function(e) {     // jump
    if (e.keyCode == 32) {
      e.preventDefault();
      game.cat.cat_state = "jump";
      if (game.cat.cat_loc_y >= 269) {
        if (game.volumeState === "ON") {
          jumpSound.play();
          jumpSound.volume = 0.2;
        }
      }
    }
  });

  window.addEventListener("keyup", function(e) {      // fall
    if (e.keyCode == 32) { // space
      game.cat.cat_state = "fall";
    }
  });

  window.addEventListener("keydown", function(e) {    // start game from menu
    if (e.keyCode == 83) { // s
      game.gameState = "GAME_SCREEN";
      game.backgroundMusic.play();
    }
  });

  window.addEventListener("keydown", function(e) {    // pause game
    if (e.keyCode == 80) { // p
      game.togglePauseGame();
    }
  });

  window.addEventListener("keydown", function(e) {    // restart game on game over
    if (e.keyCode == 82) { // r
      game.restart();
    }
  });

  const sound = document.getElementById("sound-btn");
  sound.addEventListener("mousedown", function() {    // clicking music btn to mute
    const sound = document.getElementById("sound-btn");
    if (game.gameState == "GAME_SCREEN") {
      if (!game.backgroundMusic.paused) {
        $(sound).css('opacity', '0.4');
        game.backgroundMusic.pause();
        game.volumeState = "OFF";
      } else {
        $(sound).css('opacity', '1.0');
        game.backgroundMusic.play();
        game.volumeState = "ON";
      }
    }
  });

  requestAnimationFrame(game.loop());

});
