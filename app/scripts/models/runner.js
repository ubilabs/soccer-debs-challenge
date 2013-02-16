Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0;

      players = Player.cache;

    function closest(){

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
        player = players[all].mesh.scale;

        player.x = player.y = player.z = (all === select) ? scale : 1;
      }

      return select;
    }

    var hit, oldHit;

    function run(){

      if (++index >= lines.length){ return; }

      var data = lines[index].split(","),
        player = Player.get(data[0]);

      player.update(data);

      if (player.IS_BALL){
        hit = closest();

        //if (hit){ return;}
      }      

      if (++count < 600){
        run();
      } else {
        count = 0;
        that.time = data[1];
        requestAnimationFrame(run);
      }
    }

    run();
  }
});