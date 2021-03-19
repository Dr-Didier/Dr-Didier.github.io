ais['minebase'] = function (startup) {
    return {
        init: function (ai) {

            ai.RELOAD_TIME = 1;
            ai.down = true;
            ai.MAX_SPEED_X = 1;
            ai.MAX_SPEED_Y = 1;
            ai.hp = 10000000;
            ai.ramForce = 100;
            ai.reload = ai.RELOAD_TIME;
        },

        update: function (ai) {
            if (ai.reload <= 0) {
                ai.shoot = true;
                ai.reload = ai.RELOAD_TIME;
            }
        },

        shooting: function(ai) {

        }
    }
};