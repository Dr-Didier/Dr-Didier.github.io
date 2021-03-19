/**
 * Created by Jonathan on 2015-11-07.
 */

var vaisseau = new createjs.Bitmap("img/Vaisseau_1.png");
vaisseau.WIDTH = 46;
vaisseau.HEIGHT = 70;
vaisseau.ACCELERATION = 0.1;
vaisseau.DECELERATION = 0.15;
vaisseau.MAX_SPEED = 5;
vaisseau.RELOAD_TIME = 80;
vaisseau.RELOAD_TIME2 = 50;
vaisseau.RELOAD_TIME3 = 50;
vaisseau.SIDE_LASER_Y_OFFSET = 25;
vaisseau.MAX_HP = 1000;
vaisseau.START_X = (game.WIDTH - vaisseau.WIDTH) / 2;
vaisseau.START_Y = (5 / 6) * (game.HEIGHT - vaisseau.HEIGHT);

vaisseau.x = vaisseau.START_X;
vaisseau.y = vaisseau.START_Y;
vaisseau.hp = vaisseau.MAX_HP;
vaisseau.isAttacked = false;
vaisseau.isDead = false;
vaisseau.speedX = 0;
vaisseau.speedY = 0;
vaisseau.reload = 0;
vaisseau.lasers = [];
vaisseau.reload2 = 0;
vaisseau.reload3 = 0;


vaisseau.update = function(event){
    if(vaisseau.isDead){
        vaisseau.hp = 0;
        vaisseau.alpha -= 0.01;
        if(vaisseau.alpha <= 0){
            game.gameover();
        }
    }
    else {
        if(vaisseau.isAttacked) {
            if(vaisseau.hp <= 0){
                vaisseau.hp = 0;
                vaisseau.isDead = true;
                stage.addChild(newExplosion(
                    vaisseau.x + vaisseau.WIDTH / 2,
                    vaisseau.y + vaisseau.HEIGHT / 2
                ));
            }

            document.getElementById("life").setAttribute("style", "width:" + 300 * vaisseau.hp / vaisseau.MAX_HP + "px");
            vaisseau.isAttacked = false;
        }

        vaisseau.movements(event);
        vaisseau.shooting(event);
    }
};

vaisseau.movements = function(event){
    // Left - Right movement
    if(keyboard.keys[keyboard.LEFT]){
        vaisseau.speedX = Math.max(vaisseau.speedX - vaisseau.ACCELERATION, -vaisseau.MAX_SPEED);
    }
    else if(keyboard.keys[keyboard.RIGHT]){
        vaisseau.speedX = Math.min(vaisseau.speedX + vaisseau.ACCELERATION, vaisseau.MAX_SPEED);
    }
    else{
        if(vaisseau.speedX > 0.1){
            vaisseau.speedX = vaisseau.speedX - vaisseau.DECELERATION;
        }
        else if(vaisseau.speedX < -0.1) {
            vaisseau.speedX = vaisseau.speedX + vaisseau.DECELERATION;
        }
        else{
            vaisseau.speedX = 0;
        }
    }

    // Up - Down movement
    if(keyboard.keys[keyboard.UP]){
        vaisseau.speedY = Math.max(vaisseau.speedY - vaisseau.ACCELERATION, -vaisseau.MAX_SPEED);
    }
    else if(keyboard.keys[keyboard.DOWN]){
        vaisseau.speedY = Math.min(vaisseau.speedY + vaisseau.ACCELERATION, vaisseau.MAX_SPEED);
    }
    else{
        if(vaisseau.speedY > 0.1){
            vaisseau.speedY = vaisseau.speedY - vaisseau.DECELERATION;
        }
        else if(vaisseau.speedY < -0.1) {
            vaisseau.speedY = vaisseau.speedY + vaisseau.DECELERATION;
        }
        else{
            vaisseau.speedY = 0;
        }
    }

    // Border collision
    var newX = vaisseau.x + vaisseau.speedX;
    var newY = vaisseau.y + vaisseau.speedY;
    if(newX > game.WIDTH - vaisseau.WIDTH){
        newX = game.WIDTH - vaisseau.WIDTH;
        vaisseau.speedX = 0;
    }
    if(newX < 0){
        newX = 0;
        vaisseau.speedX = 0;
    }
    if(newY > game.HEIGHT - vaisseau.HEIGHT ){
        newY = game.HEIGHT - vaisseau.HEIGHT;
        vaisseau.speedY = 0;
    }
    if(newY < 0){
        newY = 0;
        vaisseau.speedY = 0;
    }


    vaisseau.x = newX;
    vaisseau.y = newY;
};

// laser
vaisseau.shooting = function(event){
    if(vaisseau.reload > 0){
        vaisseau.reload--;
    }

    if (vaisseau.reload2 > 0) {
        vaisseau.reload2--;
    }

    if (vaisseau.reload3 > 0) {
        vaisseau.reload3--;
    }

    if(keyboard.keys[keyboard.SPACE] && vaisseau.reload <= 0){
        var laser = newLaser(vaisseau.x + vaisseau.WIDTH / 2, vaisseau.y, Math.PI / 2, 100, "img/laser.png");
        vaisseau.lasers.push(laser);
        stage.addChildAt(laser, game.VAISSEAU_LASER_INDEX);
        vaisseau.reload = vaisseau.RELOAD_TIME;
        createjs.Sound.play("laserPewPew", {volume: 0.1});
    }

    if (keyboard.keys[keyboard.SPACE] && vaisseau.reload2 <= 0) {
        var laser = newLaser(vaisseau.x + vaisseau.WIDTH / 10, vaisseau.y + vaisseau.SIDE_LASER_Y_OFFSET, Math.PI / 2, 50, "img/laser2.png");
        vaisseau.lasers.push(laser);
        stage.addChildAt(laser, game.VAISSEAU_LASER_INDEX);
        vaisseau.reload2 = vaisseau.RELOAD_TIME2;
        createjs.Sound.play("laserPewPew", {volume: 0.1});
    }

    if (keyboard.keys[keyboard.SPACE] && vaisseau.reload3 <= 0) {
        var laser = newLaser(vaisseau.x + vaisseau.WIDTH / 1.1, vaisseau.y + vaisseau.SIDE_LASER_Y_OFFSET,  Math.PI / 2, 50, "img/laser2.png");
        vaisseau.lasers.push(laser);
        stage.addChildAt(laser, game.VAISSEAU_LASER_INDEX);
        vaisseau.reload3 = vaisseau.RELOAD_TIME3;
        createjs.Sound.play("laserPewPew", {volume: 0.1});
    }

    for(var i = 0 ; i < vaisseau.lasers.length ; i++){
        vaisseau.lasers[i].update();

        for(var j = 0 ; j < enemies.list.length ; j++){
            if(enemies.list[j].getTransformedBounds().intersection(vaisseau.lasers[i].getTransformedBounds())){
                vaisseau.lasers[i].needToBeDestroyed = true;
                enemies.list[j].hp -= vaisseau.lasers[i].damage;
                enemies.list[j].isAttacked = true;
                if(enemies.list[j].hp <= 0){
                    enemies.list[j].needToBeDestroyed = true;
                }

                break;
            }
        }

        if(vaisseau.lasers[i].needToBeDestroyed){
            stage.removeChild(vaisseau.lasers[i]);
            vaisseau.lasers.splice(i, 1);
            i--;
        }
    }
};