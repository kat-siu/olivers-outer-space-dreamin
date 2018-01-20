class Score {
  constructor(multiplier) {
    this.score_location_x = 20;
    this.score_location_y = 20;

    this.score = 0;
  }

  draw(ctx) {
    ctx.font = "20px Courier";
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, this.score_location_x, this.score_location_y);
  }

  addPoints() {
    this.score += 1;
  }
}

module.exports = Score;
