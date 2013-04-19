GLOBAL.Player = Klass({

  init: function(name){
    this.sensors = [];
    this.possessionTime = 0;
    this.possessions = [];
    this.hitCount = 0;
    this.active = false;
    this.name = name;

    this.counter = 0;

    var isTeam1 = MAPPING.TEAM1.indexOf(PLAYERS[name][0]) > -1;
    this.team = isTeam1 ? TYPES.TEAM1 : TYPES.TEAM2;

    this.running = new Running(this);

    this.heatmap = new Heatmap(this, 32, 50);

    this.initBrowser();
  },

  initBrowser: function(){

    if (!IS_BROWSER) { return; }

    this.$li = document.createElement("li");
    $(this.team).appendChild(this.$li);

    this.$name = this.addSpan("name");
    this.$time = this.addSpan("time");
    this.$hits = this.addSpan("hits");

    this.$name.innerText = this.name.split(" ")[1];
    this.$time.innerText = "000";

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

    if (!this.timeStamp){
      this.timeStamp = time;
      return;
    }

    diff = time - this.timeStamp;

    if (diff/1e12 < 1/50) { return; }

    this.timeStamp = time;

    speed = computeSpeed(distance, diff);

    for (var i in SPEED){
      if ((1*i) <= speed){
        type = i;
      }
    }

    this.running.update(time, type, distance);

    if (IS_BROWSER){
      this.renderSpeedInBrowser(speed, type);
    } else {
      this.renderSpeedInNode(speed, type);
    }

    this.speed = (speed + this.speed||0) / 2;
  },

  renderSpeedInBrowser: function(speed, type){

    var color = SPEED_COLOR[type];

    this.counter += 0.1;

    this.context.beginPath();
    this.context.moveTo(this.counter-1, 20-this.speed);

    this.context.strokeStyle = color;

    this.$speed.style.color = color;

    this.context.lineTo(this.counter, 20-this.speed);
    this.context.stroke();

    this.$speed.innerText = Math.round(this.speed) + "km/h";
  },

  renderSpeedInNode: function(){

  },

  possessionTimeframe: function(timeframe){
    var total = 0,
      min = GAME.time - timeframe,
      possession,
      diff,
      start,
      end,
      i;

    for (i=0; i<this.possessions.length; i++){

      possession = this.possessions[i];

      start = Math.max(possession.start, min);
      end = possession.end || GAME.time;

      if (end > min){
        diff = end - start;
        total += Math.max(diff, 0);
      }
    }

    return total;
  },

  calculatePosession: function(time){

    if (this.active){
      this.possessionTime += time - this.time;
      this.time = time;
    }

    if (IS_BROWSER){
      this.renderPosessionInBrowser();
    } else {
      this.renderPosessionInNode();
    }
  },

  renderPosessionInBrowser: function(){

    this.$time.innerText = Math.round(this.possessionTime / 1e12) + "s";
    this.$hits.innerText = this.hitCount + "x";

    this.$li.className = this.active ? "active" : "";
  },

  renderPosessionInNode: function(){

  },

  select: function(active, time){

    if (active){

      if (!this.active){
        this.possession = { start: time };
        this.possessions.push(this.possession);

        this.time = time;
        this.hitCount++;
      }

    } else {
      this.possession.end = time;
      this.possessionTime += time - this.time;
    }

    this.active = active;

  }
});