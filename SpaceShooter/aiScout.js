ais['scoutBase'] =  function(startLeft){
    return {
        init: function (ai) {
            if(startLeft){
                ai.left = true;
            }
            else{
                ai.right = true;
            }

            ai.ZIGZAG_TIME = 100;
            ai.RELOAD_TIME = 100;
            ai.down = true;
            ai.MAX_SPEED_X = 1;
            ai.MAX_SPEED_Y = 1;
            ai.zigzag = ai.ZIGZAG_TIME;
            ai.reload = ai.RELOAD_TIME;
			ai.hp = 180
        },

        update: function (ai) {
            if (ai.zigzag > 0) {
                ai.zigzag--;
            }

            if (ai.reload > 0) {
                ai.shoot = false;
                ai.reload--;
            }

            if (ai.zigzag <= 0) {
                if (ai.left) {
                    ai.left = false;
                    ai.right = true;
                }
                else {
                    ai.right = false;
                    ai.left = true;
                }

                ai.zigzag = ai.ZIGZAG_TIME;
            }

            if(ai.reload <= 0){
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