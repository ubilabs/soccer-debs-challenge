GLOBAL.Running = Klass({
  init: function(player){
    this.player = player;
    this.c = new Cache(1/50 * 3).entries;
    this.index = 0;
  },

  update: function(time, type, distance){

    this.time = time;

    if (!this.current){
      this.current = {
        time: time,
        type: type
      };

      this.c[0] = time / 1e10;
      this.c[1] = 1*type;
      this.c[2] = distance;

      return;
    }


    if (type == this.current.type){
      this.c[this.index*3 + 2] = this.c[this.index*3 + 2] + distance;

      return;
    }

    if ((time - this.current.time) > 1e12){

      this.index++;

      this.current = {
        time: time,
        type: type
      };

      this.c[this.index*3 + 0] = time / 1e10;
      this.c[this.index*3 + 1] = type;
      this.c[this.index*3 + 2] = distance;

      for (var all in TIME_WINDOWS){
        this.render(
          TIME_WINDOWS[all]
        );
      }
    }
  },

  render: function(timeframe){

    var types = {},
      output = [this.time, this.player.name],
      minTime = this.time - timeframe * 1e12 * 60,
      timeDiff,
      type, time, distance, i, entry, next,
      j, k;

    for (i in SPEED){
      types[i] = {
        time: 0,
        distance: 0
      };
    }

    for (i=0; i<this.index-1;i++){

      j = i * 3;
      k = (i+1) * 3;

      entry = {
        time: this.c[j+0] * 1e10,
        type: this.c[j+1],
        distance: this.c[j+2]
      };

      next = {
        time: this.c[k+0] * 1e10,
        type: this.c[k+1],
        distance: this.c[k+2]
      };

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

    for (i in types){
      type = types[i];
      output.push(
        Math.round(type.time / 1e12),
        Math.round(type.distance)
      );
    }

    if (!IS_BROWSER){
      write("running_aggregate" + timeframe, output);
    }

  }
});