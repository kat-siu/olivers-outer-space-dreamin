const gameOverScreen = ctx => {
  const text1 = "GAME OVER";
  const text2 = "You woke Oliver up from his dream!";
  const text3 = "Press 'r' to start dreaming again.";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, 600, 360);
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "60px Visitor1";
  ctx.fillText(text1, 300, 130);
  ctx.strokeText(text1, 300, 130);
  ctx.font = "30px Visitor1";
  ctx.fillText(text2, 300, 200);
  ctx.strokeText(text2, 300, 200);
  ctx.fillText(text3, 300, 230);
  ctx.strokeText(text3, 300, 230);
};

module.exports = gameOverScreen;
