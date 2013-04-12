PAUSED = false;



Runner = Model({

  init: function(lines, scene){

    GAME = {
      goal: 0,
      out: 0,
      inField: false
    };

    GAME.sensors = {};
    GAME.players = new Players();
    GAME.teams = new Teams(GAME.players);
    GAME.target = new Target();
    GAME.count = 0;
    GAME.index = 0;

    var that = this,

      $goal = $("goal"),
      $out = $("out"),
      $shot = $("shot"),
      $acceleration = $("acceleration"),
      $speed = $("speed"),
      $speedbar = $("speedbar"),
      $accelerationbar = $("accelerationbar");

    function checkHit(){

      var min = BALL_SIZE,
        distance, select,
        all, sensor;

      if (!GAME.inField){
        if (GAME.current){
          GAME.current.player.select(false, GAME.time);
        }
        GAME.current = null;
        return;
      }

      for (all in GAME.sensors){
        sensor = GAME.sensors[all];
        if (sensor != GAME.ball){
          distance = computeDistance(
            GAME.ball.position,
            sensor.position
          );

          if ((distance < min)){
            select = sensor;
            min = distance;
          }
        }
      }

      GAME.ball.hit = !!select;

      var scale = select ? 2.5 : 1;

      for (all in GAME.sensors){
        sensor = GAME.sensors[all];
        sensor.scale = (sensor === select) ? scale : 1;
      }

      select = select || GAME.current;

      if (select){

        if (GAME.current){
          if (GAME.current.player == select.player){
            GAME.current.player.select(true, GAME.time);
            return;
          }
          GAME.current.player.select(false, GAME.time);
        }

        select.player.select(true, GAME.time);

        GAME.current = select;
      }
    }

    function render(){
      for (var all in GAME.sensors){
        GAME.sensors[all].update();
      }

      GAME.target.render();

      $goal.style.opacity = (new Date() - GAME.goal) < 1000 ? 1 : 0;
      $out.style.opacity = (new Date() - GAME.out) < 1000 ? 1 : 0;
      $shot.style.opacity = (new Date() - shot) < 1000 ? 1 : 0;

      var speed = Math.round(
          GAME.ball.data[5] / // |v|
          1e6 / // µm
          1000 * // km
          60 * // minutes
          60 // secods
        );

      $speed.innerHTML = speed;

      $acceleration.innerHTML = Math.round(GAME.ball.acceleration);

      $speedbar.style.width = speed + "px";
      $accelerationbar.style.width = GAME.ball.acceleration + "px";

      GAME.players.render(GAME.time);
      GAME.teams.render();
    }

    function checkGoal(){

      var x = GAME.ball.position.x,
        y = Math.abs(GAME.ball.position.y),
        z = GAME.ball.position.z;

      if (
        y > GOAL_Y &&
        y < GOAL_Y + BALL_SIZE &&
        x > GOAL_XMIN &&
        x < GOAL_XMAX &&
        z < GOAL_Z
      ){
        GAME.goal = new Date();
        GAME.inField = false;
      } else if (
        y > MAXY &&
        Math.abs(x) > MAXX
      ) {
        GAME.out = new Date();
        GAME.inField = false;
      } else {
        GAME.inField = true;
      }
    }

    function checkShotOnGoal(){
      // GAME.target.render(ball);
    }

    // END = 14794090930027846;
    // GAME.index = 452011;

    function run(){

      if (++GAME.index >= lines.length){ return; }

      var data = lines[GAME.index].split(","),
       id = data[0],
        sensor = GAME.sensors[id];

      // create a new sensor
      if (!sensor){
        sensor = new Sensor(id);
        GAME.sensors[id] = sensor;
        if (sensor.IS_BALL){ GAME.ball = sensor; }
        GAME.players.add(sensor);
      }


      sensor.position = {
        x: 1*data[2],
        y: 1*data[3],
        z: 1*data[4]
      };

      sensor.last = sensor.data;
      sensor.data = data;

      if (sensor == GAME.ball){

        GAME.time = GAME.ball.data[1];

        if (GAME.time > END){
          PAUSED = true;
          END = Infinity;
        }

        GAME.ball.acceleration = data[6] / 1e6;

        // if (ball.acceleration > 55){ console.log(GAME.time)}

        checkShotOnGoal();
        checkGoal();
        checkHit();
      }

      if (++GAME.count < ITERATIONS){
        run();
      } else {
        GAME.count = 0;
        that.time = GAME.time;
        render();
        if (PAUSED) { return; }
        requestAnimationFrame(run);
      }
    }

    document.addEventListener("keydown", function(event){

      console.log(event.keyCode);

      switch (event.keyCode){
        case 32: PAUSED = !PAUSED; run(); break;
        case 39: run(); break;
      }
    });

    run();
  }
});