const Background = require('./background.js');
const Cat = require('./cat.js');
const Food = require('./food.js');
const Score = require('./score.js');
const Obstacles = require('./obstacles.js');

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();
    this.cat = new Cat();
    this.food = [];
    this.obstacles = new Obstacles();
    this.score = new Score(1);

    this.loop = this.loop.bind(this);
  }

  draw() {
    this.background.draw(this.ctx);

    for (let i = 0; i < this.food.length; i++) {
      this.food[i].draw(this.ctx);
    }
    this.cat.draw(this.ctx);
    // this.obstacles.draw(this.ctx);
    this.score.draw(this.ctx);
  }

  update() {
    if (Math.floor(Math.random() * 100) == 1) {
      this.food.push(new Food());
    }

    for (let i = 0; i < this.food.length; i++) {
      this.food[i].update();
      if (this.checkHit(this.food[i]) == true) {
        this.food.splice(i, 1);
        this.score.addPoints();
      } else if (this.food[i].foodInBound() == false) {
        this.food.splice(i, 1);
      }
    }

    this.background.update();
    this.cat.update();
    this.obstacles.update();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  checkHit(food) {
    if (this.cat.cat_loc_x + this.cat.catWidth > food.food_loc_x &&
        this.cat.cat_loc_y < food.food_loc_y &&
        this.cat.cat_loc_y + this.cat.catHeight > food.food_loc_y) {
          return true;
      }
      // else if (this.cat.cat_loc_x + this.cat.catWidth > food.food_loc_x &&
      //   this.cat.cat_loc_y + this.cat.catHeight > food.food_loc_y &&
      //   this.cat.cat_loc_y + this.cat.catHeight < food.food_loc_y +   food.foodHeight) {
      //     return true;
      // }

    // if (this.cat.cat_loc_x + this.cat.catWidth > food.food_loc_x
    //   && this.cat.cat_loc_y < food.food_loc_y
    //    ) {
    //   console.log("EAT ME");
    // }

  }
  //
  // if (rect1.x < rect2.x + rect2.width &&
  //   rect1.x + rect1.width > rect2.x &&
  //   rect1.y < rect2.y + rect2.height &&
  //   rect1.height + rect1.y > rect2.y) {
  //     // collision detected!
  //   }

}
module.exports = Game;
