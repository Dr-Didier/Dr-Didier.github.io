/**
 * Created by Jonathan on 2015-11-07.
 */

var background = new createjs.Bitmap("img/space.png");
var background2 = new createjs.Bitmap("img/space.png");
background.x = 0;
background.y = 0;
background2.x = 0;
background2.y = -game.HEIGHT;
background.speedY = 1;

background.update = function(){
    var newY = background.y + background.speedY;
    var newY2 = background2.y + background.speedY;

    if(newY >= game.HEIGHT){
        newY = -game.HEIGHT;
    }

    if(newY2 >= game.HEIGHT){
        newY2 = -game.HEIGHT;
    }

    background.y = newY;
    background2.y = newY2;
};

var overBackground = new createjs.Bitmap("img/space2.png");
var overBackground2 = new createjs.Bitmap("img/space2.png");
overBackground.x = 0;
overBackground.y = 0;
overBackground2.x = 0;
overBackground2.y = -game.HEIGHT;
overBackground.speedY = 3;

overBackground.update = function(){
    var newY = overBackground.y + overBackground.speedY;
    var newY2 = overBackground2.y + overBackground.speedY;

    if(newY >= game.HEIGHT){
        newY = -game.HEIGHT;
    }

    if(newY2 >= game.HEIGHT){
        newY2 = -game.HEIGHT;
    }

    overBackground.y = newY;
    overBackground2.y = newY2;
};

var overspace = new createjs.Bitmap("img/space3.png");
var overspace2 = new createjs.Bitmap("img/space3.png");
overspace.x = 0;
overspace.y = 0;
overspace2.x = 0;
overspace2.y = -game.HEIGHT;
overspace.speedY = 2;

overspace.update = function(){
    var newY = overspace.y + overspace.speedY;
    var newY2 = overspace2.y + overspace.speedY;

    if(newY >= game.HEIGHT){
        newY = -game.HEIGHT;
    }

    if(newY2 >= game.HEIGHT){
        newY2 = -game.HEIGHT;
    }

    overspace.y = newY;
    overspace2.y = newY2;
};