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

    this.cat_width = 50;
    this.cat_height = 45;

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
      if (this.cat_loc_y + this.cat_height > 300) {
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
    ctx.drawImage(this.spriteSheet, this.cat_sprite_buffer_width, 0, this.cat_width, this.cat_height, this.cat_loc_x, this.cat_loc_y, this.cat_width, this.cat_height);
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
// document.addEventListener("DOMContentLoaded", () => {
//   debugger
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//
//   // let background = new Background(ctx);
//   // background.draw(ctx);
//
//
//
//   // let background = new Image();
//   // background.src = './assets/images/ground.png';
//   // background.onload = function() {
//   //   ctx.drawImage(foreground, foreground_loc_x, foreground_loc_y, 600, 360);
//   //   ctx.drawImage(foreground, foreground_loc_x + 600, foreground_loc_y, 600, 360);
//   // };
//   //
//   // let foreground = new Image();
//   // foreground.src = './assets/images/planet.jpg';
//   // foreground.onload = function() {
//   //   ctx.drawImage(foreground, 0, 0);
//   // };

//   //
//   // const backgroundCanvas = document.getElementById('background-canvas');
//   // const backgroundCanvasCtx = backgroundCanvas.getContext('2d');
//   //
//   // const foregroundCanvas = document.getElementById('foreground-canvas');
//   // const foregroundCanvasCtx = foregroundCanvas.getContext('2d');
// });


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(0);
const Cat = __webpack_require__(1);

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();
    this.cat = new Cat();

    this.loop = this.loop.bind(this);
  }

  draw() {
    this.background.draw(this.ctx);
    this.cat.draw(this.ctx);
  }

  update() {
    this.background.update();
    this.cat.update();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }
}

module.exports = Game;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map