Runner = Model({
  cache: {},

  init: function(lines, scene){

    this.scene = scene;

    var that = this,
      count = 0,
      index = 0;

    function run(){

      index++;

      var data = lines[index];

      if (!data) { return; }

      data = data.split(",");

      var id = 1 * data[0],
        player = that.getPlayer(id);

      player.update(data);

      if (id == 4){
        //closest();
      }      

      count++;

      if (count < 2000){
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
  },
});