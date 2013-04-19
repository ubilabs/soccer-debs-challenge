GLOBAL.Running = Klass({
  init: function(player){
    this.player = player;
    this.last = {
      time: 0,
      type: "initial",
      distance: 0
    };
    this.cache = [];
  },

  update: function(time, type, distance){


    if (type == this.last.type){
      this.last.distance += distance;
      return; 
    }

    if (!this.last.time){
      console.log(time);
      this.last.time = time;
    }

    if ((time - this.last.time) > 1e12){

      this.cache.push(this.last);

      this.last = {
        time: time,
        type: type,
        distance: distance
      };

      this.render();
    }
  },

  render: function(){

    if (this.player.name != "Philipp Harlass"){ return; }

    console.log(SPEED[this.last.type], this.last.distance);

    var i, types = {}, type, entry, time;

    for (i in SPEED){
      types[i] = {
        time: 0,
        distance: 0
      };
    }

    for (i=0; i<this.cache.length; i++){
      entry = this.cache[i];
      type = types[entry.type];

      if (entry.type != "initial"){
        type.distance += entry.distance;
        type.time += entry.time - time;
      }

      time = entry.time;
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

    console.log(time/1e12, output.join("\n"));
  }
});