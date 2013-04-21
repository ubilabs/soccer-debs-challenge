GLOBAL.App = Model({

  $time: $("time"),

  init: function(){

    GLOBAL.app = this;

    if (IS_BROWSER){
      this.initBrowser();
    }

    this.game = new Game();

    this.render();
    this.load();
  },

  initBrowser: function(){
    this.stats = new FPSCounter();
    this.scene = new Scene();
  },

  load: function(){
    var loader = new Loader();
    loader.on("data", this.onData);
  },

  onData: function(data){
    this.game.push(data);
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

      if (seconds < 10) { seconds = "0" + seconds; }

      if (this.lastUpdate){
        factor = (time - this.lastUpdate.stream) / (local - this.lastUpdate.local);
      }

      this.$time.innerText = Math.round(factor) + "x " + haltime + " HALF - " + formatTime(time);

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

new App();