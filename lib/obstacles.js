class Obstacles {
  constructor() {
    this.asteroid = new Image();
    this.asteroid.src = './assets/images/obstacle.png';

    this.asteroid_loc_x = 600;
    this.asteroid_loc_y = Math.floor(Math.random() * (270-10) + 10);
    this.asteroidHeight = 35;
    this.asteroidWidth = 50;
    this.ang = 0;
  }

  update() {
    this.asteroid_loc_x -= 2;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.asteroid_loc_x, this.asteroid_loc_y);
    ctx.rotate((Math.PI / 180) * (this.ang += .2));
    ctx.drawImage(this.asteroid, 0, 0);
    ctx.restore();
  }

  asteroidInBound() {
    if (this.asteroid_loc_x < -50) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Obstacles;
