document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // canvasEl.width = 800;
  // canvasEl.height = 480;

  // ctx.fillStyle = "gray";
  // ctx.fillRect(0, 0, 800, 480);

  // ctx.beginPath();
  // ctx.rect(20, 400, 50, 50);
  // ctx.fillStyle = "#FF0000";
  // ctx.fill();
  // ctx.closePath();

  // ctx.beginPath();
  // ctx.arc(240, 160, 20, 0, Math.PI*2, false);
  // ctx.fillStyle = "green";
  // ctx.fill();
  // ctx.closePath();
  
  ctx.beginPath();
  ctx.rect(160, 10, 100, 40);
  ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
  ctx.stroke();
  ctx.closePath();
  var x = canvas.width/2;
  var y = canvas.height-30;
  var dx = 2;
  var dy = -2;
  var ballRadius = 10;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }

    x += dx;
    y += dy;
  }

  setInterval(draw, 10);
  //
  // const backgroundCanvas = document.getElementById('background-canvas');
  // const backgroundCanvasCtx = backgroundCanvas.getContext('2d');
  //
  // const foregroundCanvas = document.getElementById('foreground-canvas');
  // const foregroundCanvasCtx = foregroundCanvas.getContext('2d');
});
