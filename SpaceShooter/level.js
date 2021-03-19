var level = {
    WIN_TIMER: 600,

    progress: 0,
    progressSpeed: 1,
    isReady: false,
    enemies: {},
    index: 0,
    winTimer: 700,

    loadLevel: function(levelNumber){
        this.isReady = false;
        var that = this;

        // Reset whole game
        this.progress = 0;
        this.index = 0;
        vaisseau.hp = vaisseau.MAX_HP;
        vaisseau.isAttacked = true;
        vaisseau.isDead = false;
        vaisseau.x = vaisseau.START_X;
        vaisseau.y = vaisseau.START_Y;
        vaisseau.alpha = 1;
		vaisseau.speedX = 0;
		vaisseau.speedY = 0;
        while(vaisseau.lasers.length > 0){
            stage.removeChild(vaisseau.lasers[0]);
            vaisseau.lasers.splice(0, 1);
        }

        while(enemies.list.length > 0){
            stage.removeChild(enemies.list[0]);
            enemies.list.splice(0, 1);
        }

        while(enemies.lasers.length > 0){
            stage.removeChild(enemies.lasers[0]);
            enemies.lasers.splice(0, 1);
        }

        this.enemies = window['level' + levelNumber].enemies;
        this.enemies.sort(function(a, b){
            return a.progress - b.progress;
        });
        document.getElementById("lifeBarEnemy").style.display = "none";
        this.isReady = true;
        game.start();

        music = createjs.Sound.play(window['level' + levelNumber].music, {volume: 0.3});

        /*loadJSON('level/' + levelNumber + '.json', function(levelData){
            that.enemies = levelData.enemies;
            that.enemies.sort(function(a, b){
                return a.progress - b.progress;
            });
            that.isReady = true;
            game.start();
        });*/
    },

    update: function(){
        this.progress += this.progressSpeed;

        if(this.index < this.enemies.length) {
            while (this.progress > this.enemies[this.index].progress) {
                enemies.add(newEnemy(
                    this.enemies[this.index].x,
                    -100,
                    ais[this.enemies[this.index].ai](),
                    this.enemies[this.index].image)
                );
                this.index++;
            }
        }
        else if(enemies.list.length <= 0) {
            this.winTimer--;

            if(this.winTimer <= 0){
                this.winTimer = this.WIN_TIMER;
                game.win();
            }
        }
    }
};

/*function loadJSON(file, callback){
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function(){
        if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
        }
    };
    xobj.send(null);
}*/