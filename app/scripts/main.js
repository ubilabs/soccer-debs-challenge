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
    this.runner = new Runner(data, this.scene);
  },

  render: function(){
    this.scene.update();
    this.stats.update();

    if (this.runner){
      var time = (START - this.runner.time) / 1e12,
        minutes = - Math.floor(time/60),
        seconds = Math.abs(Math.round(time % 60));
      if (seconds < 10) { seconds = "0" + seconds; }
      this.$time.innerHTML = minutes + ":" + seconds;
    }
    requestAnimationFrame( this.render );
  }
});

app = new App();