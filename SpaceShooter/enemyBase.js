/**
 * Created by Jonathan on 2015-11-07.
 */

function newEnemy(x, y, ai, image){
    var enemy = new createjs.Bitmap(image);
    enemy.WIDTH = 46;
    enemy.HEIGHT = 70;
    enemy.ACCELERATION = 0.1;
    enemy.DECELERATION = 0.1;
    enemy.MAX_SPEED_X = 2;
    enemy.MAX_SPEED_Y = 2;
    enemy.DELETE_OFFSET = 200;
    enemy.MAX_HP = 1000;

    enemy.x = x;
    enemy.y = y;
    enemy.speedX = 0;
    enemy.speedY = 0;
    enemy.ai = ai;
    enemy.hp = 100;
    enemy.laserForce = 50;
    enemy.ramForce = 20;
    enemy.needToBeDestroyed = false;
    enemy.deleteOffScreen = true;
    enemy.deleteOnRam = true;

    // Boss only
    enemy.isBoss = false;
    enemy.isAttacked = false;
    enemy.hasAppeared = false;

    enemy.left = false;
    enemy.right = false;
    enemy.down = false;
    enemy.up = false;
    enemy.shoot = false;

    ai.init(enemy);

    enemy.update = function(){
        if(enemy.isBoss){
            if(!enemy.hasAppeared){
                enemy.hasAppeared = true;
                document.getElementById("lifeEnemy").setAttribute("style", "width: 300px");
                document.getElementById("lifeBarEnemy").style.display = "block";
            }

            if(enemy.isAttacked){
                document.getElementById("lifeEnemy").setAttribute("style", "width:" + 300 * enemy.hp / enemy.MAX_HP + "px");
            }
        }

        enemy.ai.update(enemy);
        enemy.movements();
        enemy.collisions();
        enemy.shooting();
    };

    // Movements
    enemy.movements = function(){
        // Left - Right movement
        if(enemy.left){
            enemy.speedX = Math.max(enemy.speedX - enemy.ACCELERATION, -enemy.MAX_SPEED_X);
        }
        else if(enemy.right){
            enemy.speedX = Math.min(enemy.speedX + enemy.ACCELERATION, enemy.MAX_SPEED_X);
        }
        else{
            if(enemy.speedX > 0.1){
                enemy.speedX = enemy.speedX - enemy.DECELERATION;
            }
            else if(enemy.speedX < -0.1) {
                enemy.speedX = enemy.speedX + enemy.DECELERATION;
            }
            else{
                enemy.speedX = 0;
            }
        }

        // Up - Down movement
        if(enemy.up){
            enemy.speedY = Math.max(enemy.speedY - enemy.ACCELERATION, -enemy.MAX_SPEED_Y);
        }
        else if(enemy.down){
            enemy.speedY = Math.min(enemy.speedY + enemy.ACCELERATION, enemy.MAX_SPEED_Y);
        }
        else{
            if(enemy.speedY > 0.1){
                enemy.speedY = enemy.speedY - enemy.DECELERATION;
            }
            else if(enemy.speedY < -0.1) {
                enemy.speedY = enemy.speedY + enemy.DECELERATION;
            }
            else{
                enemy.speedY = 0;
            }
        }

        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;
    };

    enemy.collisions = function(){
        // Delete enemy if outside screen
        if(enemy.deleteOffScreen) {
            if (enemy.y < -enemy.HEIGHT - enemy.DELETE_OFFSET || enemy.y > game.HEIGHT + enemy.DELETE_OFFSET ||
                enemy.x < -enemy.WIDTH - enemy.DELETE_OFFSET || enemy.x > game.WIDTH + enemy.DELETE_OFFSET) {
                enemy.needToBeDestroyed = true;
            }
        }

        // vaisseau collision
        if (!vaisseau.isDead && enemy.getTransformedBounds().intersection(vaisseau.getTransformedBounds())) {
            vaisseau.hp -= enemy.ramForce;
            vaisseau.isAttacked = true;

            if(enemy.deleteOnRam) {
                enemy.hp = 0;
                enemy.needToBeDestroyed = true
            }
        }
    };

    // Lasers
    enemy.shooting = function(){
        ai.shooting(enemy);
    };

    return enemy;
}