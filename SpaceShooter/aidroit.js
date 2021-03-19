ais['droitBase'] = function (startup) {
    return {
        init: function (ai) {

            ai.RELOAD_TIME = 100;
            ai.down = true;
            ai.MAX_SPEED_X = 1.5;
            ai.MAX_SPEED_Y = 2;
            ai.reload = ai.RELOAD_TIME;
        },

        update: function (ai) {

            if (ai.reload > 0) {
                ai.shoot = false;
                ai.reload--;
            }
            if (ai.reload <= 0) {
                ai.shoot = true;
                ai.reload = ai.RELOAD_TIME;
            }
        },

        shooting: function(ai) {
            if(ai.shoot){
                var laser1 = newLaser(ai.x + ai.WIDTH / 2, ai.y + ai.HEIGHT, Math.PI * 1.5, ai.laserForce, "img/laserEnemy.png");
                var laser2 = newLaser(ai.x + ai.WIDTH * 1.5, ai.y + ai.HEIGHT, Math.PI * 1.5, ai.laserForce, "img/laserEnemy.png");
                enemies.lasers.push(laser1);
                enemies.lasers.push(laser2);
                stage.addChildAt(laser1, game.VAISSEAU_LASER_INDEX);
                stage.addChildAt(laser2, game.VAISSEAU_LASER_INDEX);
            }
        }
    }
};