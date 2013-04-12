App = Model({

  $time: $("time"),

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
    this.game = new Game(data, this.scene);
  },

  render: function(){
    this.scene.update();
    this.stats.update();

    if (this.game){
      var time = (START - this.game.time) / 1e12,
        local = new Date() / 1000,
        minutes = - Math.floor(time/60),
        seconds = Math.abs(Math.round(time % 60)),
        factor = 0;

      if (seconds < 10) { seconds = "0" + seconds; }

      if (this.lastUpdate){
        factor = (this.lastUpdate.stream - time) / (local - this.lastUpdate.local);
      }

      this.$time.innerHTML = minutes + ":" + seconds + " " + Math.round(factor) + "x";

      this.lastUpdate = {
        stream: time,
        local: local
      };
    }
    requestAnimationFrame( this.render );
  }
});

app = new App();