/**
 * Created by Jonathan on 2015-11-07.
 */

var stage;
var music;

createjs.Sound.registerSound("music/cantinaband.mp3", "music1", 1);
createjs.Sound.registerSound("music/Fleeing Kuro.mp3", "music2", 1);
createjs.Sound.registerSound("music/throne.mp3", "music3", 1);
createjs.Sound.registerSound("music/darkmaul.mp3", "music4", 1);
createjs.Sound.registerSound("music/Temple.mp3", "music5", 1);
createjs.Sound.registerSound("sound/laserPewPew.mp3", "laserPewPew", 15);
createjs.Sound.registerSound("sound/explosion.mp3", "explosion", 20);

var game = {
    WIDTH: 800,
    HEIGHT: 600,
	VAISSEAU_LASER_INDEX: 6,

    init: function(){
        stage = new createjs.Stage("gameCanvas");

        stage.addChild(background);
        stage.addChild(background2);
        stage.addChild(overBackground);
        stage.addChild(overBackground2);
		stage.addChild(overspace);
		stage.addChild(overspace2);

        stage.addChild(vaisseau);
    },
	
	start: function(){
        createjs.Ticker.setFPS(120);
		createjs.Ticker.addEventListener("tick", game.update);
		document.getElementById("mainMenu").style.display = "none";
		document.getElementById("pauseMenu").style.display = "none";
		//createjs.Sound.play("music1");
	},
	
	stop: function(){
		createjs.Ticker.removeAllEventListeners();
		if(window.getComputedStyle(document.getElementById("mainMenu"), null).display == "none"){
			document.getElementById("pauseMenu").style.display = "block";
		}
	},

	gameover: function(){
		createjs.Ticker.removeAllEventListeners();
		document.getElementById("gameoverMenu").style.display = "block";
	},

	win: function(){
		createjs.Ticker.removeAllEventListeners();
		document.getElementById("winMenu").style.display = "block";
	},

	mainmenu: function(){
		document.getElementById("winMenu").style.display = "none";
		document.getElementById("gameoverMenu").style.display = "none";
		document.getElementById("mainMenu").style.display = "block";

		var fadeOut = function(){
			if(music.volume == 0){
				createjs.Sound.stop();
				return;
			}

			music.volume -= 0.01;
			setTimeout(fadeOut, 10);
		};

		setTimeout(fadeOut, 10);
	},
	
	onKeyDown: function(event){
		if(event.keyCode == 80){
			if(window.getComputedStyle(document.getElementById("pauseMenu")).display == "none"){
				this.stop();
			}
			else{
				this.start();
			}
		}
	},

    update: function(event){
		level.update();
        vaisseau.update(event);
		enemies.update();
        background.update();
        overBackground.update();
		overspace.update();
        stage.update();
    }
};
