const Background = require('./background.js');
const Cat = require('./cat.js');
const Food = require('./food.js');
const Score = require('./score.js');
const Obstacles = require('./obstacles.js');
const gameOverScreen = require('./game_over.js');
const pauseScreen = require('./pause_screen.js');

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();
    this.cat = new Cat();
    this.food = [];
    this.obstacles = [];
    this.score = new Score(1);

    this.gameState = "GAME_SCREEN";
    // this.togglePlay = this.togglePlay.bind(this);
    // this.muteSounds();
    // this.muteSounds = false;

    this.loop = this.loop.bind(this);

    this.backgroundMusic = new Audio('./assets/sounds/background.mp3');
    this.backgroundMusic.loop = true;
    this.catMeow = new Audio('./assets/sounds/cat_meow.mp3');

  }

  draw() {
    console.log(this.gameState);
    if (this.gameState == "GAME_SCREEN") {
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
      if (this.checkObstacleHit(this.obstacles[i]) == true) {
        this.gameOver();
      } else if (this.obstacles[i].asteroidInBound() == false) {
        this.obstacles.splice(i, 1);
      }
    }
  }

  updateFood() {
    if (Math.floor(Math.random() * 100) == 1) {
      this.food.push(new Food());
    }

    for (let i = 0; i < this.food.length; i++) {
      this.food[i].update();
      if (this.checkFoodHit(this.food[i]) == true) {
        this.food.splice(i, 1);
        this.score.addPoints();
      } else if (this.food[i].foodInBound() == false) {
        this.food.splice(i, 1);
      }
    }
  }

  update() {
    if (this.gameState == "GAME_SCREEN") {
      this.background.update();
      this.cat.update();
      this.updateObstacles();
      this.updateFood();
    }
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  checkFoodHit(food) {
    if (this.cat.cat_loc_x + this.cat.catWidth > food.food_loc_x &&
        this.cat.cat_loc_y < food.food_loc_y + food.foodHeight &&
        this.cat.cat_loc_y + this.cat.catHeight > food.food_loc_y &&
        this.cat.cat_loc_x < food.food_loc_x + food.foodWidth) {
          return true;
      }

  }
  // if (rect1.x < rect2.x + rect2.w &&
  //         rect1.x + rect1.w > rect2.x &&
  //         rect1.y < rect2.y + rect2.h &&
  //         rect1.h + rect1.y > rect2.y)

  checkObstacleHit(obstacle) {
    if (this.cat.cat_loc_x + this.cat.catWidth > obstacle.asteroid_loc_x &&
        this.cat.cat_loc_y < obstacle.asteroid_loc_y + obstacle.asteroidHeight &&
        this.cat.cat_loc_y + this.cat.catHeight > obstacle.asteroid_loc_y &&
        this.cat.cat_loc_x < obstacle.asteroid_loc_x + obstacle.asteroidWidth) {
          return true;
    } // FIGURE OUT #S TO ADD BUFFER!!
  }

  // muteSounds() {
  //   document.getElementById('mute').addEventListener('click', function(e) {
  //     // alert('music toggle pressed');
  //     var musicToggle = do
  //   });
  // }

  togglePauseGame() {
    if (this.gameState == "PAUSED") {
      this.gameState = "GAME_SCREEN";
      this.backgroundMusic.play();
    } else if (this.gameState == "GAME_SCREEN") {
      this.gameState = "PAUSED";
      this.backgroundMusic.pause();
      pauseScreen(this.ctx);
    }
  }

  // togglePauseSounds() {
  //   if (this.soundState = "")
  // }

  gameOver() {
    gameOverScreen(this.ctx);
    this.gameState = "GAME_OVER";
    this.backgroundMusic.pause();
    this.catMeow.play();
  }

}
module.exports = Game;
