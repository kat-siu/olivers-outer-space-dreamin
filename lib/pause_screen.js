const pauseScreen = ctx => {
  const text1 = "PAUSED";
  const text2 = "Press 'p' to resume dreaming!";
  ctx.textAlign = "center";
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "60px Visitor1";
  ctx.fillText(text1, 300, 130);
  ctx.strokeText(text1, 300, 130);
  ctx.font = "30px Visitor1";
  ctx.fillText(text2, 300, 200);
  ctx.strokeText(text2, 300, 200);
};

module.exports = pauseScreen;
