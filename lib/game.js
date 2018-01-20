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
    this.obstacles = [];
    this.score = new Score(1);
    this.setSounds();

    this.loop = this.loop.bind(this);
  }

  draw() {
    this.background.draw(this.ctx);

    for (let i = 0; i < this.food.length; i++) {
      this.food[i].draw(this.ctx);
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].draw(this.ctx);
    }

    this.cat.draw(this.ctx);
    this.score.draw(this.ctx);
    this.backgroundMusic.play();
  }

  updateObstacles() {
    if (this.score.score < 20) {
      if (Math.floor(Math.random() * 100) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (20 < this.score.score < 40) {
      if (Math.floor(Math.random() * 90) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (40 < this.score.score < 60) {
      if (Math.floor(Math.random() * 80) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (60 < this.score.score < 80) {
      if (Math.floor(Math.random() * 70) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (80 < this.score.score < 100) {
      if (Math.floor(Math.random() * 60) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (100 < this.score.score < 120) {
      if (Math.floor(Math.random() * 50) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (120 < this.score.score < 140) {
      if (Math.floor(Math.random() * 40) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (140 < this.score.score < 160) {
      if (Math.floor(Math.random() * 30) == 1) {
        this.obstacles.push(new Obstacles());
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      this.obstacles[i].update();
    }
  }

  updateFood() {
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
  }

  update() {
    this.background.update();
    this.cat.update();
    this.updateObstacles();
    this.updateFood();
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

  // sound(src) {
  //   this.sound = canvas.createElement("audio");
  //   this.sound.src = src;
  //   this.sound.setAttribute("preload", "auto");
  //   this.sound.setAttribute("controls", "none");
  //   this.sound.style.display = "none";
  //   canvas.appendChild(this.sound);
  //   this.play = function() {
  //     this.sound.play();
  //   };
  //   this.stop = function() {
  //     this.sound.pause();
  //   };
  // }

  setSounds() {
    this.backgroundMusic = new Audio('./assets/sounds/background.mp3');
    this.backgroundMusic.loop = true;
  }

  muteSounds() {
    
  }
}
module.exports = Game;
