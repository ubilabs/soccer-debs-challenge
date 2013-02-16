Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0;

      players = Player.cache;

    function closest(){

      var min = 50000,
        d, select,
        ball = 8,
        all;

      for (all in players){
        if (all != ball){
          d = distance(
            players[8].position, 
            players[all].position
          );

          if ((d < min)){
            select = all;
            min = d;
          }
        }
      }

      var hit = d < 10000,
        scale = hit ? 5 : 2.5, 
        player;

      for (all in players){
        player = players[all].mesh.scale;

        player.x = player.y = player.z = (all === select) ? scale : 1;
      }
    }

    function run(){

      if (++index > lines.length){ return; }

      var data = lines[index].split(","),
        player = Player.get(data[0]);

      player.update(data);

      if (player.IS_BALL){
        closest();
      }      

      if (++count < 6000){
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