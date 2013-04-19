GLOBAL.Game = Klass({

  goal: false,
  out: false,
  shot: false,
  inField: false,
  paused: false,

  sensors: {},
  iteration: 0,
  count: 0,
  index: 0,

  $goal: $("goal"),
  $out: $("out"),
  $shot: $("shot"),
  $acceleration: $("acceleration"),
  $speed: $("speed"),
  $speedbar: $("speedbar"),
  $accelerationbar: $("accelerationbar"),

  init: function(){

    GLOBAL.GAME = this;

    this.players = new Players();
    this.teams = new Teams(this.players);
    this.target = new Target();

    this.startTime = new Date();
    this.initKeys();
  },

  push: function(lines){

    if (IS_BROWSER){
      this.lines = lines;
      this.runInBrowser();
    } else {
      lines.forEach(this.parse.bind(this));
    }

  },

  initKeys: function(){

    if (!IS_BROWSER){ return; }

    document.addEventListener("keydown", function(event){
      switch (event.keyCode){
        case 32: this.paused = !this.paused; this.runInBrowser(); break;
        case 39: runInBrowser(); break;
      }
    }.bind(this));
  },

  checkHit: function(){

    var min = BALL_SIZE,
      distance, select,
      all, sensor;

    if (!this.inField){
      if (this.current){
        this.current.player.select(false, this.time);
      }
      this.current = null;
      return;
    }

    for (all in this.sensors){
      sensor = this.sensors[all];
      if (sensor != this.ball){
        distance = computeDistance(
          this.ball.position,
          sensor.position
        );

        if ((distance < min)){
          select = sensor;
          min = distance;
        }
      }
    }

    this.ball.hit = !!select;

    var scale = select ? 2.5 : 1;

    for (all in this.sensors){
      sensor = this.sensors[all];
      sensor.scale = (sensor === select) ? scale : 1;
    }

    select = select || this.current;

    if (select){

      if (this.current){
        if (this.current.player == select.player){
          this.current.player.select(true, this.time);
          return;
        }
        this.current.player.select(false, this.time);
      }

      select.player.select(true, this.time);

      this.current = select;
    }
  },

  render: function(){

    if (!this.ball){ return; }

    if (IS_BROWSER){
      this.renderInBrowser();
    } else {
      this.renderInNode();
    }

    this.players.render(this.time);
    this.teams.render();
  },

  renderInBrowser: function(){

    for (var all in this.sensors){
      this.sensors[all].renderInBrowser();
    }

    this.$goal.className = this.goal ? "active" : "";
    this.$out.className = this.out ? "active" : "";
    this.$shot.className = this.shot ? "active" : "";

    this.goal = false;

    var speed = Math.round(
      this.ball.data[5] / // |v|
      1e6 / // µm
      1000 * // km
      60 * // minutes
      60 // secods
    );

    this.$speed.innerText = speed + " m/s";

    this.$acceleration.innerText = Math.round(this.ball.acceleration) + " m/s²";

    this.$speedbar.style.width = speed + "px";
    this.$accelerationbar.style.width = this.ball.acceleration + "px";
  },

  renderInNode: function(){
    //console.log(this.index, this.lines.length);
  },

  isInField: function(sensor){
    return (
      sensor.position.y > MINY &&
      sensor.position.y < MAXY &&
      sensor.position.x > MINX &&
      sensor.position.x < MAXX
    );
  },

  checkGoal: function(){

    this.out = false;

    if (!this.ball.last){
      return;
    }

    var goal = goalTarget(this.ball.last, this.ball.position);

    if (
      goal.hit
    ){
      this.goal = true;
      this.inField = false;
      console.log("goal");
    } else if (
      !this.isInField(this.ball)
    ) {
      this.out = true;
      this.inField = false;
    } else {
      this.inField = true;
    }

  },

  end: function(){

    if (this.paused){ return; }

    var duration = new Date() - this.startTime;
    this.paused = true;
    console.log("Parsing time: " + duration/1000 + " seconds");
  },

  runInBrowser: function(){
    if (this.index >= this.lines.length){ return; }

    this.parse(this.lines[this.index]);
    this.index++;

    if (++this.iteration < ITERATIONS){
      this.runInBrowser();
    } else {
      this.iteration = 0;
      this.render();
      if (this.paused) { return; }
      requestAnimationFrame(this.runInBrowser.bind(this));
    }

  },

  parse: function(line){

    this.count++;

    var data = line.split(","),
      id = data[0],
      sensor = this.sensors[id];

    // create a new sensor
    if (!sensor){
      sensor = new Sensor(id);
      this.sensors[id] = sensor;
      this.players.add(sensor);
    }

    sensor.last = sensor.position;

    sensor.position = {
      x: 1*data[2],
      y: 1*data[3],
      z: 1*data[4]
    };

    sensor.data = data;

    if (sensor.IS_BALL){
      sensor.active = this.isInField(sensor);
      if (sensor.active){
        this.ball = sensor;
      }
    }

    if (sensor.active){
      this.time = this.ball.data[1];

      if (this.time > TIMES.SECOND.END){
        this.end();
      }

      if (
        (this.time > TIMES.FIRST.START && this.time < TIMES.FIRST.END) ||
        (this.time > TIMES.SECOND.START && this.time < TIMES.SECOND.END)
      ) {
        this.ball.acceleration = data[6] / 1e6;
        this.checkGoal();
        this.checkHit();
      }

      this.target.render();

    }

  }

});