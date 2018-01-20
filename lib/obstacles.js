class Obstacles {
  constructor() {
    this.asteroid = new Image();
    this.asteroid.src = './assets/images/obstacle.png';

    function getRandomXLocation(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function getRandomYLocation(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    this.asteroid_loc_x = getRandomXLocation(120, 600);
    this.asteroid_loc_y = getRandomYLocation(10, 270);
  }

  update() {
    this.asteroid_loc_y -= 2;

    if (this.asteroid_loc_x == -600) {
      this.asteroid_loc_x = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.asteroid, this.asteroid_loc_x, this.asteroid_loc_y);
    ctx.drawImage(this.asteroid, this.asteroid_loc_x + 580, this.asteroid_loc_y);
  }
}

module.exports = Obstacles;
