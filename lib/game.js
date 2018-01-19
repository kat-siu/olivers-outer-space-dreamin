const Background = require('./background.js');
const Cat = require('./cat.js');
const Score = require('./score.js')

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();
    this.cat = new Cat();
    this.score = new Score();

    this.loop = this.loop.bind(this);
  }

  draw() {
    this.background.draw(this.ctx);
    this.cat.draw(this.ctx);
    this.score.draw(this.ctx);
  }

  update() {
    this.background.update();
    this.cat.update();
    // this.score.update(this.score);
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }
}

module.exports = Game;
