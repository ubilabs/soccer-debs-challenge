GLOBAL.Cache = Klass({
  LENGTH: TIMES.SECOND.END - TIMES.FIRST.START,
  init: function(interval){
    this.length = Math.ceil(this.LENGTH / 1e12 / interval);
    this.interval = interval;
    this.entries = new Uint32Array(this.length);
  },

  index: function(time){
    return Math.round(
      (time - TIMES.FIRST.START) / this.LENGTH * this.length
    );
  },

  set: function(time, value){
    this.entries[this.index(time)] = value;
  },

  get: function(time){
    return this.entries[this.index(time)];
  }
});