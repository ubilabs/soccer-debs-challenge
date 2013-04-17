GLOBAL.App = Model({

  $time: $("time"),

  init: function(){

    if (IS_BROWSER){
      this.initBrowser();
    }

    this.render();
    this.load();
  },

  initBrowser: function(){
    this.stats = new FPSCounter();
    this.scene = new Scene();
  },

  load: function(){
    var loader = new Loader();
    loader.on("loaded", this.loaded);
  },

  loaded: function(data){
    this.game = new Game(data, this.scene);
  },

  render: function(){

    if (!IS_BROWSER){ return; }

    this.scene.update();
    this.stats.update();

    if (this.game && this.game.ball){
      var haltime = this.game.time > TIMES.SECOND.START ? "SECOND" : "FIRST",
        time = (TIMES[haltime].START - this.game.time) / 1e12,
        local = new Date() / 1000,
        minutes = - Math.floor(time/60),
        seconds = Math.abs(Math.round(time % 60)),
        factor = 0;

      if (seconds < 10) { seconds = "0" + seconds; }

      if (this.lastUpdate){
        factor = (this.lastUpdate.stream - time) / (local - this.lastUpdate.local);
      }

      this.$time.innerText = Math.round(factor) + "x " + haltime + " HALF - " + minutes + ":" + seconds;

      this.lastUpdate = {
        stream: time,
        local: local
      };
    }
    requestAnimationFrame( this.render );
  },

  renderInBrowser: function(){
    
  }
});

app = new App();