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
