function newLaser(x, y, angle, damage, image){
	var laser = new createjs.Bitmap(image);
	laser.SPEED = 4;
	laser.WIDTH = laser.image.width;
	laser.HEIGHT = laser.image.height;

	laser.x = x - laser.WIDTH / 2;
	laser.y = y - laser.HEIGHT / 2;
	laser.angle = angle;
    laser.rotation = (Math.PI * 2 - (laser.angle - Math.PI / 2)) * 180 / Math.PI;
	laser.damage = damage;
	laser.needToBeDestroyed = false;
	laser.update = function(){
        laser.x += laser.SPEED * Math.cos(laser.angle);
        laser.y += laser.SPEED * -Math.sin(laser.angle);
	
		if(laser.y < -200 || laser.y > game.HEIGHT + 200 ||
           laser.x < -200 || laser.x > game.WIDTH + 200){
			laser.needToBeDestroyed = true;
		}
	};
	
	return laser;
}