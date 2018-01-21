class Food {
  constructor() {
    this.sushi = new Image();
    this.drumstick = new Image();

    this.foodHeight = 0;

    this.sushi.src = './assets/images/sushi.png';
    this.drumstick.src = './assets/images/drumstick.png';

    this.food_loc_x = 600;
    this.food_loc_y = Math.floor(Math.random() * (250-10) + 10);

    this.foodType = "";

    if ((Math.floor(Math.random() * 2) % 2) == 0) {
      this.foodType = "sushi";
      this.foodHeight = 35;
      this.foodWidth = 50;
    } else {
      this.foodType = "drumstick";
      this.foodHeight = 50;
      this.foodWidth = 30;
    }
  }

  update() {
    this.food_loc_x -= 2;
  }

  draw(ctx) {
    if (this.foodType == "sushi") {
      ctx.drawImage(this.sushi, this.food_loc_x, this.food_loc_y);
    } else if (this.foodType == "drumstick") {
      ctx.drawImage(this.drumstick, this.food_loc_x, this.food_loc_y);
    }
  }

  foodInBound() {
    if (this.food_loc_x < -50) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Food;
