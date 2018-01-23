/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Background {
  constructor() {
    this.foreground = new Image();
    this.ground = new Image();

    this.foreground.src = './assets/images/stars.png';
    this.ground.src = './assets/images/ground.png';

    this.foreground_loc_x = 0;
    this.foreground_loc_y = 0;

    this.ground_loc_x = 0;
    this.ground_loc_y = 300;

  }

  update() {
    this.foreground_loc_x -= 3;
    this.ground_loc_x -= 1;

    if (this.foreground_loc_x == -600) {
        this.foreground_loc_x = 0;
    }

    if (this.ground_loc_x == -880) {
        this.ground_loc_x = 0;
    }
  }

  draw(ctx) {
    ctx.drawImage(this.foreground, this.foreground_loc_x, this.foreground_loc_y, 600, 360);
    ctx.drawImage(this.foreground, this.foreground_loc_x + 600, this.foreground_loc_y, 600, 360);

    ctx.drawImage(this.ground, this.ground_loc_x, this.ground_loc_y, 880, 60);
    ctx.drawImage(this.ground, this.ground_loc_x + 880, this.ground_loc_y, 880, 60);
  }
}

module.exports = Background;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Cat {
  constructor() {
    this.spriteSheet = new Image();
    this.spriteSheet.src = './assets/images/astro_oliver.png'; // 50x45 sprites

    this.catWidth = 50;
    this.catHeight = 45;

    // Location of Cat on screen
    this.cat_loc_x = 100;
    this.cat_loc_y = 120;

    this.cat_sprite = 0;

    this.cat_state = "fall";
  }

  run() {
    this.cat_sprite++;

    if (this.cat_sprite == 60) {
        this.cat_sprite = 0;
    }

    this.cat_sprite_buffer_width = 50 * parseInt(this.cat_sprite/10);
  }

  update() {
    this.run();
    if (this.cat_state == "fall") { // oliver doesn't fall off canvas
      if (this.cat_loc_y + this.catHeight > 315) {
        // console.log('game over');
        // game over state
      } else {
        this.cat_loc_y += 3.5;
      }
    } else if (this.cat_state == "jump") { // oliver doesn't fly off canvas
      if (this.cat_loc_y < 0) {
        // console.log('game over');
        // game over state
      } else {
        this.cat_loc_y -= 3;
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(this.spriteSheet, this.cat_sprite_buffer_width, 0, this.catWidth, this.catHeight, this.cat_loc_x, this.cat_loc_y, this.catWidth, this.catHeight);
  }


}

module.exports = Cat;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(3);
const Background = __webpack_require__(0);
const Cat = __webpack_require__(1);

$(window).ready(function(){
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);
  const jumpSound = new Audio('./assets/sounds/jump.mp3');


  window.addEventListener("keypress", function(e) {     // jump
    if (e.keyCode == 32) {
      e.preventDefault();
      game.cat.cat_state = "jump";
      if (game.cat.cat_loc_y >= 269) {
        if (game.volumeState === "ON") {
          jumpSound.play();
          jumpSound.volume = 0.2;
        }
      }
    }
  });

  window.addEventListener("keyup", function(e) {      // fall
    if (e.keyCode == 32) { // space
      game.cat.cat_state = "fall";
    }
  });

  window.addEventListener("keydown", function(e) {    // start game from menu
    if (e.keyCode == 83) { // s
      game.gameState = "GAME_SCREEN";
      game.backgroundMusic.play();
    }
  });

  window.addEventListener("keydown", function(e) {    // pause game
    if (e.keyCode == 80) { // p
      game.togglePauseGame();
    }
  });

  window.addEventListener("keydown", function(e) {    // restart game on game over
    if (e.keyCode == 82) { // r
      game.restart();
    }
  });

  const sound = document.getElementById("sound-btn");
  sound.addEventListener("mousedown", function() {    // clicking music btn to mute
    const sound = document.getElementById("sound-btn");
    if (game.gameState == "GAME_SCREEN") {
      if (!game.backgroundMusic.paused) {
        $(sound).css('opacity', '0.4');
        game.backgroundMusic.pause();
        game.volumeState = "OFF";
      } else {
        $(sound).css('opacity', '1.0');
        game.backgroundMusic.play();
        game.volumeState = "ON";
      }
    }
  });

  requestAnimationFrame(game.loop());

});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(0);
const Cat = __webpack_require__(1);
const Food = __webpack_require__(5);
const Score = __webpack_require__(4);
const Obstacles = __webpack_require__(6);
const menuScreen = __webpack_require__(9);
const gameOverScreen = __webpack_require__(7);
const pauseScreen = __webpack_require__(8);

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();
    this.cat = new Cat();
    this.food = [];
    this.obstacles = [];
    this.score = new Score(1);
    // this.muteSounds();

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
    if (this.cat.cat_loc_x - 8 + this.cat.catWidth - 10 > obstacle.asteroid_loc_x - 8 &&
        this.cat.cat_loc_y - 8 < obstacle.asteroid_loc_y - 8 + obstacle.asteroidHeight - 8 &&
        this.cat.cat_loc_y - 10 + this.cat.catHeight - 8 > obstacle.asteroid_loc_y - 8 &&
        this.cat.cat_loc_x - 20 < obstacle.asteroid_loc_x - 8 + obstacle.asteroidWidth - 25) {
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Score {
  constructor(multiplier) {
    this.score_location_x = 10;
    this.score_location_y = 20;

    this.score = 0;
  }

  draw(ctx) {
    ctx.font = "25px Visitor1";
    ctx.fillStyle = "white";
    ctx.textAlign = "start";
    ctx.fillText(`Score: ${this.score}`, this.score_location_x, this.score_location_y);
  }

  addPoints() {
    this.score += 5;
  }
}

module.exports = Score;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

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


/***/ }),
/* 6 */
/***/ (function(module, exports) {

class Obstacles {
  constructor() {
    this.asteroid = new Image();
    this.asteroid.src = './assets/images/obstacle.png';

    this.asteroid_loc_x = 600;
    this.asteroid_loc_y = Math.floor(Math.random() * (270-10) + 10);
    this.asteroidHeight = 35;
    this.asteroidWidth = 50;
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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const gameOverScreen = ctx => {
  const text1 = "GAME OVER";
  const text2 = "You woke Oliver up from his dream!";
  const text3 = "Press 'r' to start dreaming again.";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, 600, 360);
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "60px Visitor1";
  ctx.fillText(text1, 300, 130);
  ctx.strokeText(text1, 300, 130);
  ctx.font = "30px Visitor1";
  ctx.fillText(text2, 300, 200);
  ctx.strokeText(text2, 300, 200);
  ctx.fillText(text3, 300, 230);
  ctx.strokeText(text3, 300, 230);
};

module.exports = gameOverScreen;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const pauseScreen = ctx => {
  const text1 = "PAUSED";
  const text2 = "Press 'p' to resume dreaming!";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(0, 0, 0, 0.6)";
  ctx.fillRect(0, 0, 600, 360);
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "60px Visitor1";
  ctx.fillText(text1, 300, 130);
  ctx.strokeText(text1, 300, 130);
  ctx.font = "30px Visitor1";
  ctx.fillText(text2, 300, 200);
  ctx.strokeText(text2, 300, 200);
};

module.exports = pauseScreen;


/***/ }),
/* 9 */
/***/ (function(module, exports) {

const menuScreen = ctx => {
  const text1 = "Oliver's Outer";
  const text2 = "Space Dream";
  const text3 = "Press 's' to START";
  const text4 = "©2018 KAT SIU";
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 360);
  ctx.textAlign = "center";
  ctx.fillStyle = "#d7bb02";
  ctx.strokeStyle = "black";
  ctx.font = "50px Visitor1";
  ctx.fillText(text1, 300, 110);
  ctx.strokeText(text1, 300, 110);
  ctx.fillText(text2, 300, 150);
  ctx.strokeText(text2, 300, 150);
  ctx.font = "40px Visitor1";
  ctx.fillText(text3, 300, 250);
  ctx.strokeText(text3, 300, 250);
  ctx.font = "20px Visitor1";
  ctx.fillText(text4, 300, 290);
  ctx.strokeText(text4, 300, 290);
};

module.exports = menuScreen;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map