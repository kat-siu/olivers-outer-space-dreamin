class Food {
  constructor() {
    this.sushi = new Image();
    this.drumstick = new Image();

    this.sushi.src = './assets/images/sushi.png';
    this.drumstick.src = './assets/images/drumstick.png';

    function getRandomXLocation(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    function getRandomYLocation(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    this.sushi_loc_x = getRandomXLocation(120, 600);
    this.sushi_loc_y = getRandomYLocation(10, 270);

    this.drumstick_loc_x = getRandomXLocation(120, 600);
    this.drumstick_loc_y = getRandomYLocation(10, 270);
  }


  update() {
    this.sushi_loc_x -= 2;
    this.drumstick_loc_x -= 2;

    if (this.sushi_loc_x == -600) {
      this.sushi_loc_x = 0;
    }

    if (this.drumstick_loc_x == -600) {
      this.drumstick_loc_x = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.sushi, this.sushi_loc_x, this.sushi_loc_y);
    ctx.drawImage(this.sushi, this.sushi_loc_x + 580, this.sushi_loc_y);

    ctx.drawImage(this.drumstick, this.drumstick_loc_x, this.drumstick_loc_y);
    ctx.drawImage(this.drumstick, this.drumstick_loc_x + 580, this.drumstick_loc_y);
  }
}

module.exports = Food;

// 600 (width) * 360 (height)
