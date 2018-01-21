class Score {
  constructor(multiplier) {
    this.score_location_x = 10;
    this.score_location_y = 20;

    this.score = 0;
  }

  draw(ctx) {
    ctx.font = "25px Visitor1";
    ctx.fillStyle = "white";
    ctx.textAlign = "start";
    ctx.fillText(`Score: ${this.score}`, this.score_location_x, this.score_location_y);
  }

  addPoints() {
    this.score += 5;
  }
}

module.exports = Score;
