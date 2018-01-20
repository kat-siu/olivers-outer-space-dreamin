class Obstacles {
  constructor() {
    this.asteroid = new Image();
    this.asteroid.src = './assets/images/obstacle.png';

    this.asteroid_loc_x = 600;
    this.asteroid_loc_y = Math.floor(Math.random() * (250-10) + 10);

    console.log(this.asteroid_loc_x);
    console.log(this.asteroid_loc_y);
  }

  update() {
    this.asteroid_loc_x -= 2;
  }

  draw(ctx) {
    ctx.drawImage(this.asteroid, this.asteroid_loc_x, this.asteroid_loc_y);
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
