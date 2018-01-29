const menuScreen = ctx => {
  const text1 = "Oliver's Outer";
  const text2 = "Space Dream";
  const text3 = "Enter your name on the left &"
  const text4 = "Press 's' to START";
  const text5 = "©2018 KAT SIU";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 360);
  ctx.textAlign = "center";
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "60px Visitor1";
  ctx.fillText(text1, 300, 90);
  ctx.strokeText(text1, 300, 90);
  ctx.fillText(text2, 300, 130);
  ctx.strokeText(text2, 300, 130);
  ctx.font = "30px Visitor1";
  ctx.fillText(text3, 300, 220);
  ctx.strokeText(text3, 300, 220);
  ctx.font = "49px Visitor1";
  ctx.fillText(text4, 300, 250);
  ctx.strokeText(text4, 300, 250);
  ctx.font = "20px Visitor1";
  ctx.fillText(text5, 300, 290);
  ctx.strokeText(text5, 300, 290);
};

module.exports = menuScreen;
