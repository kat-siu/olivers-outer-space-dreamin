const Background = require('./background.js');
const Cat = require('./cat.js');

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

  moveCat() {
    this.cat.cat_loc_y -= 6; 
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
