/**
 * Created by Jonathan on 2015-11-07.
 */

var keyboard = {
    UP: 0,
    LEFT: 1,
    RIGHT: 2,
    DOWN: 3,
    x: 32,
    z:32,
    c: 32,

    //     up     left   right  down	Shoot   shoot 	Shoot
    keys: [false, false, false, false, false, false, false,],

    onKeyDown: function(event){
        var keyDown = event.keyCode;
        switch(keyDown){
            case 38: this.keys[this.UP] = true; break;
            case 37: this.keys[this.LEFT] = true; break;
            case 39: this.keys[this.RIGHT] = true; break;
            case 40: this.keys[this.DOWN] = true; break;
            case 90: this.keys[this.z] = true; break;
            case 88: this.keys[this.x] = true; break;
            case 67: this.keys[this.c] = true; break;
        }
    },

    onKeyUp: function(event){
        var keyUp = event.keyCode;
        switch(keyUp){
            case 38: this.keys[this.UP] = false; break;
            case 37: this.keys[this.LEFT] = false; break;
            case 39: this.keys[this.RIGHT] = false; break;
            case 40: this.keys[this.DOWN] = false; break;
            case 90: this.keys[this.z] = false; break;
            case 88: this.keys[this.x] = false; break;
            case 67: this.keys[this.c] = false; break;
        }
    }
}