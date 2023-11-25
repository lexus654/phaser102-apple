import "./style.css";
import Phaser from "phaser";

const speedDown = 100;
const size = {
  width: 500,
  height: 500,
};

class GameScene extends Phaser.Scene {
  constructor() {
    super("scene-game");
    this.player;
    this.cursor;
    this.playerSpeed = speedDown + 50;
  }
  preload() {
    this.load.image("bg", "./public/assets/bg.png");
    this.load.image("char", "./public/assets/basket.png");
  }
  create() {
    this.add.image(0, 0, "bg").setOrigin(0, 0);
    this.player = this.physics.add
      .image(0, size.height - 100, "char")
      .setOrigin(0, 0);
    // this.player.setImmovable(true);
    this.player.body.allowGravity = true;
    this.player.setCollideWorldBounds(true);
    this.cursor = this.input.keyboard.createCursorKeys();
  }
  update() {
    const { up, left, right } = this.cursor;
    if (left.isDown) {
      this.player.setVelocityX(-this.playerSpeed);
    } else if (right.isDown) {
      this.player.setVelocityX(this.playerSpeed);
    } else if (up.isDown) {
      this.player.setVelocityY(400);
    } else {
      this.player.setVelocityX(0);
    }

    if (up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-50);
    }
  }
}

const config = {
  type: Phaser.WEBGL,
  width: size.width,
  height: size.height,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: speedDown },
      debug: true,
    },
  },
  scene: [GameScene],
};

const game = new Phaser.Game(config);
