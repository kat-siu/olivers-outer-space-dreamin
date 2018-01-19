const Game = require('./game.js');
const Background = require('./background.js');
const Cat = require('./cat.js');

$(window).ready(function(){
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);

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
//
//
//
//
//   //moving circle
//   // ctx.beginPath();
//   // ctx.rect(160, 10, 100, 40);
//   // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
//   // ctx.stroke();
//   // ctx.closePath();
//   // var x = canvas.width/2;
//   // var y = canvas.height-30;
//   // var dx = 0;
//   // var dy = 1;
//   // var ballRadius = 10;
//   //
//   // function drawBall() {
//   //   ctx.beginPath();
//   //   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//   //   ctx.fillStyle = "#0095DD";
//   //   ctx.fill();
//   //   ctx.closePath();
//   // }
//   //
//   // function draw() {
//   //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   //   drawBall();
//   //
//   //   if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//   //     dx = -dx;
//   //   }
//   //   if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//   //     dy = -dy;
//   //   }
//   //
//   //   x += dx;
//   //   y += dy;
//   // }
//   //
//   // setInterval(draw, 10);
//   //
//   // const backgroundCanvas = document.getElementById('background-canvas');
//   // const backgroundCanvasCtx = backgroundCanvas.getContext('2d');
//   //
//   // const foregroundCanvas = document.getElementById('foreground-canvas');
//   // const foregroundCanvasCtx = foregroundCanvas.getContext('2d');
// });
