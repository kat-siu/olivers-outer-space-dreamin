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
    if (this.cat_state == "fall") {
      if (this.cat_loc_y + this.catHeight > 300) {
        console.log('game over');
      } else {
        this.cat_loc_y += 3;
      }
    } else if (this.cat_state == "jump") {
      if (this.cat_loc_y < 0) {
        console.log('game over');
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

  window.addEventListener("keydown", function(e) {
    if (e.keyCode == 32) {
      game.cat.cat_state = "jump";
    }
  });

  window.addEventListener("keyup", function(e) {
    if (e.keyCode == 32) {
      game.cat.cat_state = "fall";
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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class Score {
  constructor(multiplier) {
    this.score_location_x = 20;
    this.score_location_y = 20;

    this.score = 0;
  }

  draw(ctx) {
    ctx.font = "20px Courier";
    ctx.fillStyle = 'white';
    ctx.fillText(this.score, this.score_location_x, this.score_location_y);
  }

  addPoints() {
    this.score += 1;
  }
}

module.exports = Score;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Cat = __webpack_require__(1);
const Score = __webpack_require__(4);

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
    } else {
      this.foodType = "drumstick";
      this.foodHeight = 50;
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

  //   function getRandomXLocation(min, max) {
  //     return Math.floor(Math.random() * (max - min) + min);
  //   }
  //
  //   function getRandomYLocation(min, max) {
  //     return Math.floor(Math.random() * (max - min) + min);
  //   }
  //
  //   this.sushi_loc_x = getRandomXLocation(120, 600);
  //   this.sushi_loc_y = getRandomYLocation(10, 270);
  //
  //   this.drumstick_loc_x = getRandomXLocation(120, 600);
  //   this.drumstick_loc_y = getRandomYLocation(10, 270);
  // }
  //
  //
  // update() {
  //   this.sushi_loc_x -= 2;
  //   this.drumstick_loc_x -= 2;
  //
  //   if (this.sushi_loc_x == -600) {
  //     this.sushi_loc_x = 0;
  //   }
  //
  //   if (this.drumstick_loc_x == -600) {
  //     this.drumstick_loc_x = 0;
  //   }
  // }
  //
  // draw(ctx) {
  //   ctx.drawImage(this.sushi, this.sushi_loc_x, this.sushi_loc_y);
  //   ctx.drawImage(this.sushi, this.sushi_loc_x + 580, this.sushi_loc_y);
  //   ctx.drawImage(this.drumstick, this.drumstick_loc_x, this.drumstick_loc_y);
  //   ctx.drawImage(this.drumstick, this.drumstick_loc_x + 580, this.drumstick_loc_y);
  // }
}

module.exports = Food;

// 600 (width) * 360 (height)


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map