const menuScreen = ctx => {
  const text1 = "Oliver's Outer";
  const text2 = "Space Dream";
  const text3 = "START";
  ctx.textAlign = "center";
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "50px Visitor1";
  ctx.fillText(text1, 300, 130);
  ctx.strokeText(text1, 300, 130);
  ctx.font = "40px Visitor1";
  ctx.fillText(text2, 300, 150);
  ctx.strokeText(text2, 300, 150);
  ctx.fillText(text3, 300, 230);
  ctx.strokeText(text3, 300, 230);
};

module.exports = gameOverScreen;
