Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0;

    function run(){

      if (++index > lines.length){ return; }

      var data = lines[index].split(","),
        player = Player.get(data[0]);

      player.update(data);

      if (player.IS_BALL){
        //closest();
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