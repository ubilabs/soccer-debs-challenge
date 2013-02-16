Runner = Model({
  cache: {},

  init: function(lines, scene){

    this.scene = scene;

    var that = this,
      count = 0,
      index = 0;

    function run(){

      if (++index > lines.length){ return; }

      var data = lines[index].split(","),
        player = that.getPlayer(data[0]);

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
  },

  getPlayer: function(id){
    var player = this.cache[id];

    if (!player){
      player = this.cache[id] = new Player({
        scene: this.scene,
        id: id
      });
    }

    return player;
  }
});