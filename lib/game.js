const Background = require('./background.js');
const Cat = require('./cat.js');
const Food = require('./food.js');
const Score = require('./score.js');
const Obstacles = require('./obstacles.js');
const menuScreen = require('./menu_screen.js');
const gameOverScreen = require('./game_over.js');
const pauseScreen = require('./pause_screen.js');
const Leaderboard = require('./leaderboard.js');

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();
    this.cat = new Cat();
    this.food = [];
    this.obstacles = [];
    this.score = new Score(1);
    this.leaderboard = new Leaderboard();
    this.leaderboard.readData();

    this.gameState = "MENU_SCREEN";
    this.volumeState = "ON";
    this.showMenuScreen();

    this.loop = this.loop.bind(this);

    this.backgroundMusic = new Audio('./assets/sounds/background.mp3');
    this.backgroundMusic.loop = true;
    this.catMeow = new Audio('./assets/sounds/cat_meow.mp3');
    this.catMeow.volume = 0.2;
    this.scorePoint = new Audio('./assets/sounds/Collect_Point_00.mp3');
    this.scorePoint.volume = 0.6;

    $('#user-name').change(function() {
      this.playerName = $('#user-name').val();
    });
  }

  showMenuScreen() {
    if (this.gameState == "MENU_SCREEN") {
      menuScreen(this.ctx);
    } else {
      this.gameState = "GAME_SCREEN";
    }
  }

  draw() {
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
    }
  }

  updateObstacles() {
    if (this.score.score < 20) {
      if (Math.floor(Math.random() * 100) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (this.score.score > 40 && this.score.score < 80) {
      if (Math.floor(Math.random() * 90) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (this.score.score > 80 && this.score.score < 120) {
      if (Math.floor(Math.random() * 80) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else if (this.score.score > 120 && this.score.score < 160) {
      if (Math.floor(Math.random() * 70) == 1) {
        this.obstacles.push(new Obstacles());
      }
    } else {
      if (Math.floor(Math.random() * 60) == 1) {
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
        if (this.volumeState === "ON") {
          this.scorePoint.play();
          this.scorePoint.volume = 0.6;
        }
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
    let userNameValue = document.getElementById('user-name').value;
    localStorage.setItem('userName', userNameValue);
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  checkFoodHit(food) {
    if (this.cat.cat_loc_x - 8 + this.cat.catWidth - 10 > food.food_loc_x - 8 &&
        this.cat.cat_loc_y - 8 < food.food_loc_y - 8 + food.foodHeight - 8 &&
        this.cat.cat_loc_y - 10 + this.cat.catHeight - 8 > food.food_loc_y - 8 &&
        this.cat.cat_loc_x - 20 < food.food_loc_x - 8 + food.foodWidth - 25) {
          return true;
      }

  }
  // if (rect1.x < rect2.x + rect2.w &&
  //         rect1.x + rect1.w > rect2.x &&
  //         rect1.y < rect2.y + rect2.h &&
  //         rect1.h + rect1.y > rect2.y)

  checkObstacleHit(obstacle) {  // added buffer to objects
    if (this.cat.cat_loc_x - 20 + this.cat.catWidth - 20 > obstacle.asteroid_loc_x - 20 &&
        this.cat.cat_loc_y - 20 < obstacle.asteroid_loc_y - 20 + obstacle.asteroidHeight - 8 &&
        this.cat.cat_loc_y - 20 + this.cat.catHeight - 20 > obstacle.asteroid_loc_y - 20 &&
        this.cat.cat_loc_x - 20 < obstacle.asteroid_loc_x - 30 + obstacle.asteroidWidth - 25) {
          return true;
    }
  }

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

  gameOver() {
    gameOverScreen(this.ctx);
    this.gameState = "GAME_OVER";
    this.backgroundMusic.pause();
    if (this.volumeState === "ON") {
      this.catMeow.play();
    }
    this.leaderboard.writeScoreData($('#user-name').val(), this.score.score);
    this.leaderboard.readData();
  }

  restart() {
    if (this.gameState == "GAME_OVER") {
      this.cat = new Cat();
      this.food = [];
      this.obstacles = [];
      this.score = new Score(1);
      this.gameState = "GAME_SCREEN";
      this.backgroundMusic = new Audio('./assets/sounds/background.mp3');
      this.backgroundMusic.play();
    }
  }



}
module.exports = Game;
