ais['boss'] =  function(){
    var updateNormal = function(ai){
        if(ai.y >= -80){
            ai.y = -80;
            ai.down = false;
        }

        if(vaisseau.x + vaisseau.WIDTH / 2 > ai.x + ai.WIDTH / 2){
            ai.left = false;
            ai.right = true;
        }
        else if(vaisseau.x + vaisseau.WIDTH / 2 < ai.x + ai.WIDTH / 2){
            ai.left = true;
            ai.right = false;
        }
        else{
            ai.left = false;
            ai.right = false;
        }

        if (ai.reload > 0) {
            ai.shoot = false;
            ai.reload--;
        }

        if(ai.reload <= 0){
            ai.shoot = true;
            ai.reload = ai.RELOAD_TIME;
        }

        if(ai.hp < ai.MAX_HP / 2){
            if(!ai.halfHP){
                ai.halfHP = true;
                ai.RELOAD_TIME /= 3;
            }

            if(Math.random() < 0.001){
                ai.left = false;
                ai.right = false;
                ai.MODE_NORMAL = false;
                ai.MODE_RAM = true;
            }
        }
    };

    var updateRam = function(ai){
        if(ai.y < game.HEIGHT){
            ai.ACCELERATION = 0.2;
            ai.MAX_SPEED_Y = 5;
            ai.down = true;
        }
        else{
            ai.y = game.HEIGHT;
            ai.speedY = 0;
            ai.ACCELERATION = 0.01;
            ai.MAX_SPEED_Y = 1.5;
            ai.down = false;
            ai.MODE_RAM = false;
            ai.MODE_RETURNING = true;
        }
    };

    var updateReturning = function(ai){
        if(ai.y > -80){
            ai.up = true;
        }
        else{
            ai.up = false;
            ai.down = true;
            ai.MODE_RETURNING = false;
            ai.MODE_NORMAL = true;
        }
    };

    return {
        init: function (ai) {
            ai.deleteOffScreen = false;
            ai.deleteOnRam = false;
            ai.y = -600;
            ai.down = true;

            ai.MAX_HP = 4000;
            ai.WIDTH = 281;
            ai.HEIGHT = 357;
            ai.ACCELERATION = 0.01;
            ai.DECELERATION = 0.01;
            ai.MAX_SPEED_X = 1.5;
            ai.MAX_SPEED_Y = 1.5;
            ai.RELOAD_TIME = 200;
            ai.MODE_NORMAL = true;
            ai.MODE_RAM = false;
            ai.MODE_RETURNING = false;

            ai.reload = ai.RELOAD_TIME;
            ai.hp = ai.MAX_HP;
            ai.collisionBounds = new createjs.Rectangle(0, 0, 80, 357);
            ai.halfHP = false;
            ai.isBoss = true;

            ai.getTransformedBounds = function(){
                this.collisionBounds.x = this.x + 100;
                this.collisionBounds.y = this.y;
                return this.collisionBounds;
            }
        },

        update: function (ai) {
            if(ai.MODE_NORMAL){
                updateNormal(ai);
            }
            else if(ai.MODE_RAM){
                updateRam(ai);
            }
            else if(ai.MODE_RETURNING){
                updateReturning(ai);
            }
        },

        shooting: function(ai) {
            if(ai.shoot){
                var laser1 = newLaser(ai.x + ai.WIDTH / 2, ai.y + ai.HEIGHT, Math.PI * 1.5, 100, "img/IceLaser.png");
                var laser2 = newLaser(ai.x + 100, ai.y + 240, Math.PI * 1.3, 100, "img/IceLaser.png");
                var laser3 = newLaser(ai.x + 180, ai.y + 240, Math.PI * 1.8, 100, "img/IceLaser.png");
                enemies.lasers.push(laser1);
                enemies.lasers.push(laser2);
                enemies.lasers.push(laser3);
                stage.addChildAt(laser1, game.VAISSEAU_LASER_INDEX);
                stage.addChildAt(laser2, game.VAISSEAU_LASER_INDEX);
                stage.addChildAt(laser3, game.VAISSEAU_LASER_INDEX);
            }
        }
    }
};