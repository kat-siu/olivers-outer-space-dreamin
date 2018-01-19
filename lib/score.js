class Score {
  constructor() {
    this.score_location_x = 20;
    this.score_location_y = 20;

    this.score = 0;
  }

  update(score) {
    this.score = score;
  }

  draw(ctx) {
    ctx.font = "20px Courier";
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, this.score_location_x, this.score_location_y);
  }
}

module.exports = Score;
