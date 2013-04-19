GLOBAL.Running = Klass({
  init: function(player){
    this.player = player;
    this.cache = [];
  },

  update: function(time, type, distance){

    this.time = time;

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
      

      this.current = {
        time: time,
        type: type,
        distance: distance
      };

      this.cache.push(this.current);

      this.render(1 * 1e12 * 10);
    }
  },

  render: function(timeframe){

    if (this.player.name != "Philipp Harlass"){ return; }

    var types = {}, 
      minTime = this.time - timeframe,
      timeDiff,
      type, time, distance, i, entry, next;

    for (i in SPEED){
      types[i] = { 
        time: 0, 
        distance: 0 
      };
    }

    for (i=0; i<this.cache.length-1;i++){
      entry = this.cache[i];
      next = this.cache[i+1];

      if (next.time > minTime){

        type = types[entry.type];

        timeDiff = next.time - entry.time;

        if (entry.time > minTime){
          time = timeDiff;
          distance = entry.distance;
        } else {
          time = next.time - minTime;
          distance = time / timeDiff * entry.distance;
        }

        type.time += time;
        type.distance += distance;          
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