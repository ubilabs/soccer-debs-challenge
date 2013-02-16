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