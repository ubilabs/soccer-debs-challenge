Player = Klass({

  init: function(name){
    this.sensors = [];
    this.possesionTime = 0;
    this.hitCount = 0;
    this.active = false;
    this.name = name;

    var isTeam1 = MAPPING.TEAM1.indexOf(PLAYERS[name][0]) > -1;
    this.team = isTeam1 ? TYPES.TEAM1 : TYPES.TEAM2;

    this.$li = document.createElement("li");

    this.$name = this.addSpan("name");
    this.$time = this.addSpan("time");
    this.$speed = this.addSpan("speed");
    this.$hits = this.addSpan("hits");

    this.$name.innerHTML = name.split(" ")[1];
    this.$time.innerHTML = "000";

    $(this.team).appendChild(this.$li);
  },

  addSpan: function(klass){
    var $span = document.createElement("span");
    $span.className = klass;
    this.$li.appendChild($span);
    return $span;
  },

  addSensor: function(leg){
    this.sensors.push(leg);
  },

  render: function(time){

    this.calculatePosession(time);
    this.calcualteSpeed(time);

    this.timeStamp = time;
  },

  calcualteSpeed: function(time){

    var diff,
      x = 0,
      y = 0,
      position,
      distance,
      speed;

    this.sensors.forEach(function(sensor){
      x += sensor.position.x;
      y += sensor.position.y;
    });

    x /= this.sensors.length;
    y /= this.sensors.length;

    position = { x: x, y: y, z: 0 };

    distance = computeDistance(position, this.position);

    this.position = position;

    if (!this.timeStamp){ return; }

    diff = time - this.timeStamp;
    speed = computeSpeed(distance, diff);

    this.$speed.innerHTML = speed.toFixed(1);
  },

  calculatePosession: function(time){

    if (this.active){
      this.possesionTime += time - this.time;
      this.time = time;
    }

    var possesion = this.possesionTime;
    possesion = Math.round(possesion / 1e12);

    this.$time.innerHTML = possesion;
    this.$hits.innerHTML = this.hitCount;

    this.$li.style.opacity = this.active ? 1 : "";
  },

  select: function(active, time){

    if (active){

      if (!this.active){
        this.time = time;
        this.hitCount++;
      }

    } else {
      this.possesionTime += time - this.time;
    }

    this.active = active;

  }
});