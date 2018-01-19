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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(1);
const Background = __webpack_require__(2);
const Cat = __webpack_require__(3);

$(window).ready(function(){
  const canvas = document.getElementById("canvas");
  const game = new Game(canvas);

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
//
//
//
//
//   //moving circle
//   // ctx.beginPath();
//   // ctx.rect(160, 10, 100, 40);
//   // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
//   // ctx.stroke();
//   // ctx.closePath();
//   // var x = canvas.width/2;
//   // var y = canvas.height-30;
//   // var dx = 0;
//   // var dy = 1;
//   // var ballRadius = 10;
//   //
//   // function drawBall() {
//   //   ctx.beginPath();
//   //   ctx.arc(x, y, ballRadius, 0, Math.PI*2);
//   //   ctx.fillStyle = "#0095DD";
//   //   ctx.fill();
//   //   ctx.closePath();
//   // }
//   //
//   // function draw() {
//   //   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   //   drawBall();
//   //
//   //   if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
//   //     dx = -dx;
//   //   }
//   //   if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
//   //     dy = -dy;
//   //   }
//   //
//   //   x += dx;
//   //   y += dy;
//   // }
//   //
//   // setInterval(draw, 10);
//   //
//   // const backgroundCanvas = document.getElementById('background-canvas');
//   // const backgroundCanvasCtx = backgroundCanvas.getContext('2d');
//   //
//   // const foregroundCanvas = document.getElementById('foreground-canvas');
//   // const foregroundCanvasCtx = foregroundCanvas.getContext('2d');
// });


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Background = __webpack_require__(2);
const Cat = __webpack_require__(3);

class Game {
  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.background = new Background();

    this.loop = this.loop.bind(this);
  }

  draw() {
    this.background.draw(this.ctx);
  }

  update() {
    this.background.update();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }


  //
  // handleKeyPress(e) {
  //
  // }
  //
  // controller = {
  //   left: false,
  //   right: false,
  //   up: false,
  //   keyListener: function(event) {
  //     const key_state = (event.type == "keydown") ? true : false;
  //     switch(event.keyCode) {
  //       case 37: //left
  //         controller.left = key_state;
  //       break;
  //       case 38: //up
  //         controller.up = key_state;
  //       break;
  //       case 39: //right key
  //         controller.right = key_state;
  //     }
  //   }
  // }
  //
  // window.addEventListener("keydown", controller.keyListener);
  // window.addEventListener("Keyup", controller.keyListener);
}

module.exports = Game;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

class Background {
  constructor() {
    this.foreground = new Image();
    this.ground = new Image();

    this.foreground.src = './assets/images/foreground.png';
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
/* 3 */
/***/ (function(module, exports) {

class Cat {
  constructor() {
    this.spriteSheet = new Image();
    this.spriteSheet.src = './assets/images/oliver-run.png'; // 40x34 sprites

    this.cat_width = 40;
    this.cat_height = 34;

    // Location of Cat on screen
    this.cat_loc_x = 120;
    this.cat_loc_y = 270;

    this.cat_sprite = 0;
  }

  run() {
    this.cat_sprite++;

    if (this.cat_sprite == 60) {
        this.cat_sprite = 0;
    }

    this.cat_sprite_buffer_width = 40 * parseInt(this.cat_sprite/10);
  }

  jump() {

  }

  update() {
    if (this.cat_loc_y == 270) {
        this.run();
    }
  }

  draw(ctx) {
    ctx.drawImage(this.spriteSheet, this.cat_sprite_buffer_width, 0, this.cat_width, this.cat_height, this.cat_loc_x, this.cat_loc_y, this.cat_width, this.cat_height);
  }

  update_state(state) {
    this.is_jump = state;
  }
}

module.exports = Cat;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map