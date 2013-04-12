Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0,

      target = new Target(),

      sensors = {},
      players = new Players(),
      teams = new Teams(players),

      ball,
      time,
      goal = 0,
      out = 0,
      inField = false,
      acceleration = 0,

      startTime,

      current,

      $goal = $("goal"),
      $out = $("out"),
      $acceleration = $("acceleration"),
      $speed = $("speed"),
      $speedbar = $("speedbar"),
      $accelerationbar = $("accelerationbar");

    function checkHit(){

      var min = BALL_SIZE,
        d, select,
        all, sensor;

      if (!inField){
        if (current){
          current.player.select(false, time);
        }
        current = null;
        return;
      }

      for (all in sensors){
        sensor = sensors[all];
        if (sensor != ball){
          d = computeDistance(
            ball.position,
            sensor.position
          );

          if ((d < min)){
            select = sensor;
            min = d;
          }
        }
      }

      var scale = select ? 2.5 : 1;

      for (all in sensors){
        sensor = sensors[all];
        sensor.scale = (sensor === select) ? scale : 1;
      }

      select = select || current;

      if (select){

        if (current){
          if (current.player == select.player){
            current.player.select(true, time);
            return;
          }
          current.player.select(false, time);
        }

        select.player.select(true, time);

        current = select;
      }
    }

    function render(){
      for (var all in sensors){
        sensors[all].update();
      }

      target.render(ball);

      $goal.style.opacity = (new Date() - goal) < 1000 ? 1 : 0;
      $out.style.opacity = (new Date() - out) < 1000 ? 1 : 0;

      var speed = Math.round(
          ball.data[5] / // |v|
          1e6 / // µm
          1000 * // km
          60 * // minutes
          60 // secods
        );

      $speed.innerHTML = speed;

      $acceleration.innerHTML = Math.round(acceleration);

      $speedbar.style.width = speed + "px";
      $accelerationbar.style.width = acceleration + "px";

      players.render(time);
      teams.render();
    }

    function checkGoal(){

      var x = ball.position.x,
        y = Math.abs(ball.position.y),
        z = ball.position.z;

      if (
        y > GOAL_Y &&
        y < GOAL_Y + BALL_SIZE &&
        x > GOAL_XMIN &&
        x < GOAL_XMAX &&
        z < GOAL_Z
      ){
        goal = new Date();
        inField = false;
      } else if (
        y > MAXY &&
        Math.abs(x) > MAXX
      ) {
        out = new Date();
        inField = false;
      } else {
        inField = true;
      }
    }

    function checkShotOnGoal(){

      // target.render(ball);
    }

    function run(){

      if (++index >= lines.length){ return; }

      var data = lines[index].split(","),
        id = data[0],
        sensor = sensors[id];

      // create a new sensor
      if (!sensor){
        sensor = new Sensor(id);
        sensors[id] = sensor;
        if (sensor.IS_BALL){ ball = sensor; }
        players.add(sensor);
      }

      if (!startTime){
        startTime = data[1];
      }

      sensor.position = {
        x: 1*data[2],
        y: 1*data[3],
        z: 1*data[4]
      };

      sensor.last = sensor.data;
      sensor.data = data;

      if (sensor == ball){

        time = ball.data[1];

        if (time > END){ return; }

        acceleration = data[6] / 1e6;

        checkShotOnGoal();
        checkGoal();
        checkHit();
      }

      if (++count < ITERATIONS){
        run();
      } else {
        count = 0;
        that.time = time;
        render();
        requestAnimationFrame(run);
      }
    }

    run();
  }
});