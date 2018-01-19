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
