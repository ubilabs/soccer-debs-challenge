App = Model({

  $time: $("#time"),

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
    this.runner = new Runner(data, this.scene);
  },

  render: function(){
    requestAnimationFrame( this.render );
    this.scene.update();
    this.stats.update();

    if (this.runner){
      var time = (this.runner.time - START) / 1e12;
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

