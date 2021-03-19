var ais = {};

var enemies = {
    list: [],
    lasers: [],

    add: function(enemy){
        this.list.push(enemy);
        stage.addChild(enemy);
    },

    update: function(){
        var i;
        for(i = 0 ; i < this.list.length ; i++){
            this.list[i].update();

            if(this.list[i].needToBeDestroyed){
                if(this.list[i].hp <= 0) {
                    stage.addChild(newExplosion(
                        this.list[i].x + this.list[i].WIDTH / 2,
                        this.list[i].y + this.list[i].HEIGHT / 2
                    ));
                }

                if(this.list[i].isBoss){
                    for(var j = 0 ; j < 100 ; j++){
                        var x = this.list[i].x + this.list[i].WIDTH / 2;
                        var y = this.list[i].y + this.list[i].HEIGHT / 2;

                        setTimeout(function(){
                            var randomX = Math.random() * 200 - 100;
                            var randomY = Math.random() * 200 - 100;

                            stage.addChild(newExplosion(
                                x + randomX,
                                y + randomY
                            ));
                        }, Math.random() * 3000);
                    }

                    document.getElementById("lifeBarEnemy").style.display = "none";
                }

                stage.removeChild(this.list[i]);
                this.list.splice(i, 1);
                i--;
            }
        }

        for(i = 0 ; i < this.lasers.length ; i++){
            this.lasers[i].update();

            if (!vaisseau.isDead && this.lasers[i].getTransformedBounds().intersection(vaisseau.getTransformedBounds())) {
                enemies.lasers[i].needToBeDestroyed = true;
                vaisseau.hp -= enemies.lasers[i].damage;
                vaisseau.isAttacked = true;
            }

            if (enemies.lasers[i].needToBeDestroyed) {
                stage.removeChild(enemies.lasers[i]);
                enemies.lasers.splice(i, 1);
                i--;
            }
        }
    }
};