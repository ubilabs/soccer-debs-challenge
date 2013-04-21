GLOBAL.Cache = Klass({
  LENGTH: TIMES.SECOND.END - TIMES.FIRST.START,
  init: function(interval){
    this.length = Math.ceil(this.LENGTH / 1e12 / interval);
    this.index = 0;
    this.interval = interval;
    this.entries = new Int32Array(this.length);

    for (var i=0; i< this.length; i++){
      this.entries[i] = -1;
    }
  },

  getPosition: function(time){
    return Math.round(
      (time - TIMES.FIRST.START) / this.LENGTH * this.length
    );
  },

  set: function(time, value){
    this.index = this.getPosition(time);
    this.entries[this.index] = value;
  },

  last: function(count, callback){
    var index;

    for (count; count >= 0; count--){
      index = this.index - count;
      if (index < 0){ break; }
      callback(this.entries[index]);
    }
  }
  
});