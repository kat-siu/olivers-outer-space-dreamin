const menuScreen = ctx => {
  const text1 = "Oliver's Outer";
  const text2 = "Space Dream";
  const text3 = "Press 's' to START";
  const text4 = "©2018 KAT SIU";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 360);
  ctx.textAlign = "center";
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "50px Visitor1";
  ctx.fillText(text1, 300, 110);
  ctx.strokeText(text1, 300, 110);
  ctx.fillText(text2, 300, 150);
  ctx.strokeText(text2, 300, 150);
  ctx.font = "40px Visitor1";
  ctx.fillText(text3, 300, 250);
  ctx.strokeText(text3, 300, 250);
  ctx.font = "20px Visitor1";
  ctx.fillText(text4, 300, 290);
  ctx.strokeText(text4, 300, 290);
};

module.exports = menuScreen;
