App = Model({

  $time: $("#time"),

  cache: {},
  index: 0,
  count: 0,

  init: function(){
    this.stats = new FPSCounter();
    this.scene = new Scene();

    this.render();
    this.load();
  },

  load: function(){
    var loader = new Loader();
    loader.on("loaded", this.loaded);
  },

  loaded: function(data){
    this.lines = data;
    this.run();
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

  run: function(){

    var that = this;

    function run(){

      that.index++;

      var data = that.lines[that.index];

      if (!data) { return; }

      data = data.split(",");

      var id = 1 * data[0],
        player = that.getPlayer(id);

      player.update(data);

      if (id == 4){
        //closest();
      }

      that.time = data[1];

      that.count++;

      if (that.count < 2000){
        run();
      } else {
        that.count = 0;
        requestAnimationFrame(run);
      }
    }

    run();


  },


  render: function(){
    requestAnimationFrame( this.render );
    this.scene.update();
    this.stats.update();

    if (this.time){
      var time = (this.time - START) / 1e12;
      this.$time.html(
        Math.floor(time/60) + ":" + Math.round(time % 60)
      );
    }
  }
});

app = new App();


function closest(){

  var min = Infinity,
    d, select,
    ball = 8,
    all;

  if (!cache[ball]){ return; }

  for (all in cache){
    if (all != ball){
      d = distance(
        cache[8].position,
        cache[all].position
      );

      if ((d < min)){
        select = all;
        min = d;
      }
    }
  }

  var scale = 1,
    player;

  if (d > 50000){
    select = null;
  }

  for (all in cache){
    scale = (all == select) ? (d < 10000 ? 5 : 2.5) : 1;
    player = cache[all].mesh.scale;

    player.x = player.y = player.z = scale;

  }
}

