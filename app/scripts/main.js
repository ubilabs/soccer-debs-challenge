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



    if (
      this.game &&
      this.game.ball &&
      this.game.time > TIMES.FIRST.START &&
      !(this.game.time > TIMES.FIRST.END && this.game.time < TIMES.FIRST.END)
    ){
      var haltime = this.game.time > TIMES.SECOND.START ? "SECOND" : "FIRST",
        time = this.game.time - TIMES[haltime].START,
        local = new Date() / 1000,
        factor = 0,
        minutes, seconds;

      time /= 1e12;

      minutes = Math.floor(time/60);
      seconds = Math.abs(Math.round(time % 60));

      if (seconds < 10) { seconds = "0" + seconds; }

      if (this.lastUpdate){
        factor = (time - this.lastUpdate.stream) / (local - this.lastUpdate.local);
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