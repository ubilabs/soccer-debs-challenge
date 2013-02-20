Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0;

      players = {};

    function checkHit(){

      var min = 1000,
        d, select,
        ball = 8,
        all;

      for (all in players){
        if (all != ball){
          d = distance(
            players[ball].position,
            players[all].position
          );

          if ((d < min)){
            select = all;
            min = d;
          }
        }
      }

      var scale = select ? 2.5 : 1,
        player;

      for (all in players){
        player = players[all].scale = (all === select) ? scale : 1;
      }

      return select;
    }

    var hit, oldHit;

    function render(){
      for (all in players){
        players[all].update();
      }
    }

    function run(){

      if (++index >= lines.length){ return; }

      var data = lines[index].split(","),
        id = data[0],
        player = players[id] || (players[id] = new Player(id));

      player.data = data;

      if (player.IS_BALL){
        checkHit();
      }

      if (++count < 4000){
        run();
      } else {
        count = 0;
        that.time = data[1];
        render();
        requestAnimationFrame(run);
      }
    }

    run();
  }
});