Game = Klass({

  goal: false,
  out: false,
  shot: false,
  inField: false,
  paused: false,

  sensors: {},
  count: 0,
  index: 0,

  $goal: $("goal"),
  $out: $("out"),
  $shot: $("shot"),
  $acceleration: $("acceleration"),
  $speed: $("speed"),
  $speedbar: $("speedbar"),
  $accelerationbar: $("accelerationbar"),

  init: function(lines, scene){

    this.lines = lines;

    window.GAME = this;

    this.players = new Players();
    this.teams = new Teams(this.players);
    this.target = new Target();

    document.addEventListener("keydown", function(event){

      console.log(event.keyCode);

      switch (event.keyCode){
        case 32: this.paused = !this.paused; this.run(); break;
        case 39: run(); break;
      }
    }.bind(this));

    this.run();
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
    for (var all in this.sensors){
      this.sensors[all].update();
    }

    this.target.render();

    this.$goal.className = this.goal ? "active" : "";
    this.$out.className = this.out ? "active" : "";
    this.$shot.className = this.shot ? "active" : "";

    var speed = Math.round(
      this.ball.data[5] / // |v|
      1e6 / // µm
      1000 * // km
      60 * // minutes
      60 // secods
    );

    this.$speed.innerText = speed;

    this.$acceleration.innerText = Math.round(this.ball.acceleration);

    this.$speedbar.style.width = speed + "px";
    this.$accelerationbar.style.width = this.ball.acceleration + "px";

    this.players.render(this.time);
    this.teams.render();
  },

  checkGoal: function(){

    this.out = false;
    this.goal = false;

    var x = this.ball.position.x,
      y = Math.abs(this.ball.position.y),
      z = this.ball.position.z;

    if (
      y > GOAL_Y &&
      y < GOAL_Y + BALL_SIZE &&
      x > GOAL_XMIN &&
      x < GOAL_XMAX &&
      z < GOAL_Z
    ){
      this.goal = true;
      this.inField = false;
    } else if (
      y > MAXY ||
      y < MINY ||
      x > MAXX ||
      x < MINX
    ) {
      this.out = true;
      this.inField = false;
    } else {
      this.inField = true;
    }

  },

  run: function(){

    if (++this.index >= this.lines.length){ return; }

    var data = this.lines[this.index].split(","),
      id = data[0],
      sensor = this.sensors[id];

    // create a new sensor
    if (!sensor){
      sensor = new Sensor(id);
      this.sensors[id] = sensor;
      if (sensor.IS_BALL){ this.ball = sensor; }
      this.players.add(sensor);
    }

    sensor.position = {
      x: 1*data[2],
      y: 1*data[3],
      z: 1*data[4]
    };

    sensor.last = sensor.data;
    sensor.data = data;

    if (sensor == this.ball){

      this.time = this.ball.data[1];

      if (this.time > END){
        this.paused = true;
        END = Infinity;
      }

      this.ball.acceleration = data[6] / 1e6;

      // if (ball.acceleration > 55){ console.log(this.time)}

      this.checkGoal();
      this.checkHit();
    }

    if (++this.count < ITERATIONS){
      this.run();
    } else {
      this.count = 0;
      this.time = this.time;
      this.render();
      if (this.paused) { return; }
      requestAnimationFrame(this.run.bind(this));
    }
  }

});