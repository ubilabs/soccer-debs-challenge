GLOBAL.Running = Klass({
  init: function(player){
    this.player = player;
    this.cache = [];
  },

  update: function(time, type, distance){

    if (!this.current){
      this.current = {
        time: time,
        type: type,
        distance: distance
      };

      this.cache.push(this.current);
      return;
    }   

    if (type == this.current.type){
      this.current.distance += distance;
      return; 
    }

    if ((time - this.current.time) > 1e12){
      this.cache.push(this.current);

      this.current = {
        time: time,
        type: type,
        distance: distance
      };

      this.render(1 * 1e12 * 60);
    }
  },

  render: function(timeframe){

    if (this.player.name != "Philipp Harlass"){ return; }

    var types = {}, 
      type, time, i, entry, next;

    for (i in SPEED){
      types[i] = { 
        time: 0, 
        distance: 0 
      };
    }

    for (i=0; i<this.cache.length;i++){
      entry = this.cache[i];
      next = this.cache[i+1];
      

      if (next){
        type = types[entry.type];
        type.time += next.time - entry.time;
        type.distance += entry.distance;
      }
    }


    var output = [];
    time = 0;

    for (i in types){
      type = types[i];
      time += type.time;
      output.push(
        [
          SPEED[i], 
          Math.round(type.time / 1e12), 
          Math.round(type.distance)
        ].join(", ")
      );
    }

    console.log(timeframe/1e12, time/1e12);
    console.log(output.join("\n"));
  }
});