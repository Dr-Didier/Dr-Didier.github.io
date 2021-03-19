function newExplosion(x, y) {
    var explosionSheet = new createjs.SpriteSheet({
        images: ["img/explode.png"],
        frames: { width: 128, height: 128 },
        animations: {
            explosion: {
                frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                speed: 0.2
            }
        }
    });

    var explosion = new createjs.Sprite(explosionSheet, 'explosion');
    explosion.x = x - 64;
    explosion.y = y - 64;

    explosion.on("animationend", function () {
        stage.removeChild(explosion);
    });

    return explosion;
}