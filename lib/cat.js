class Cat {
  constructor() {
    this.spriteSheet = new Image();
    this.spriteSheet.src = './assets/images/astro_oliver_sprite.png'; // 50x45 sprites

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
