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

  requestAnimationFrame(game.loop());

});
// document.addEventListener("DOMContentLoaded", () => {
//   debugger
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//
//   // let background = new Background(ctx);
//   // background.draw(ctx);
//
//
//
//   // let background = new Image();
//   // background.src = './assets/images/ground.png';
//   // background.onload = function() {
//   //   ctx.drawImage(foreground, foreground_loc_x, foreground_loc_y, 600, 360);
//   //   ctx.drawImage(foreground, foreground_loc_x + 600, foreground_loc_y, 600, 360);
//   // };
//   //
//   // let foreground = new Image();
//   // foreground.src = './assets/images/planet.jpg';
//   // foreground.onload = function() {
//   //   ctx.drawImage(foreground, 0, 0);
//   // };

//   //
//   // const backgroundCanvas = document.getElementById('background-canvas');
//   // const backgroundCanvasCtx = backgroundCanvas.getContext('2d');
//   //
//   // const foregroundCanvas = document.getElementById('foreground-canvas');
//   // const foregroundCanvasCtx = foregroundCanvas.getContext('2d');
// });
