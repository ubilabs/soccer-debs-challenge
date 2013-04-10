Player = Klass({

  init: function(name){
    this.sensors = [];
    this.possesionTime = 0;
    this.hitCount = 0;
    this.active = false;
    this.name = name;

    this.counter = 0;

    var isTeam1 = MAPPING.TEAM1.indexOf(PLAYERS[name][0]) > -1;
    this.team = isTeam1 ? TYPES.TEAM1 : TYPES.TEAM2;

    this.heatmap = new Heatmap(this, 64, 100);

    this.initDisplay();
  },

  initDisplay: function(){
    this.$li = document.createElement("li");
    $(this.team).appendChild(this.$li);

    this.$name = this.addSpan("name");
    this.$time = this.addSpan("time");
    this.$hits = this.addSpan("hits");

    this.$name.innerHTML = this.name.split(" ")[1];
    this.$time.innerHTML = "000";

    this.$canvas = document.createElement("canvas");
    this.$canvas.width = 100;
    this.$canvas.height = 20;

    this.context = this.$canvas.getContext('2d');

    this.$speed = this.addSpan("speed");
    this.$li.appendChild(this.$canvas);
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

    this.heatmap.render(time);

    this.timeStamp = time;
  },

  calcualteSpeed: function(time){

    var diff,
      x = 0,
      y = 0,
      position,
      distance,
      speed,
      type,
      color;

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

    for (var i in SPEED){
      if ((1*i) < this.speed){
        type = i;
      }
    }

    this.renderSpeed(speed, type);
    this.speed = (speed + this.speed||0) / 2;

  },

  renderSpeed: function(speed, type){

    var color = SPEED_COLOR[type];

    this.counter += 0.3;

    this.context.beginPath();
    this.context.moveTo(this.counter-1, 20-this.speed);

    this.context.strokeStyle = color;

    this.$speed.style.color = color;

    this.context.lineTo(this.counter, 20-this.speed);
    this.context.stroke();

    this.$speed.innerHTML = Math.round(this.speed) + "km/h";
  },

  calculatePosession: function(time){

    if (this.active){
      this.possesionTime += time - this.time;
      this.time = time;
    }

    this.$time.innerHTML = Math.round(this.possesionTime / 1e12) + "s";
    this.$hits.innerHTML = this.hitCount + "x";

    this.$li.className = this.active ? "active" : "";
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