Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0;

      players = {},
      goal = 0,

      out = 0,

      $goal = $("goal"),
      $out = $("out"),
      $acceleration = $("acceleration"),
      $speed = $("speed"),
      $speedbar = $("speedbar"),
      $accelerationbar = $("accelerationbar");

    function checkHit(){

      var min = BALL_SIZE,
        d, select,
        ball = 8,
        all;

      for (all in players){
        if (all != ball){
          d = distance(
            players[ball].position,
            players[all].position
          );

          if ((d < min)){
            select = all;
            min = d;
          }
        }
      }

      var scale = select ? 2.5 : 1,
        player;

      for (all in players){
        player = players[all].scale = (all === select) ? scale : 1;
      }

      return select;
    }

    var hit, oldHit;

    function render(){
      for (var all in players){
        players[all].update();
      }

      var ball = players[8];

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

      var dt = (ball.data[1] - ball.last[1]) / 1e12,
        dv = (ball.data[5] - ball.last[5]) / 1e6,
        acceleration = Math.round(dv / dt);

      $acceleration.innerHTML = acceleration;

      $speedbar.style.width = speed + "px";
      $accelerationbar.style.width = acceleration + "px";
    }

    function checkGoal(ball){

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
      } else if (
        y > MAXY &&
        Math.abs(x) > MAXX
      ) {
        out = new Date();
      }
    }

    function run(){

      if (++index >= lines.length){ return; }

      var data = lines[index].split(","),
        id = data[0],
        player = players[id] || (players[id] = new Player(id));

      player.position = {
        x: 1*data[2],
        y: 1*data[3],
        z: 1*data[4]
      };

      player.last = player.data;
      player.data = data;

      if (player.IS_BALL){
        checkHit();
        checkGoal(player);
      }

      if (++count < ITERATIONS){
        run();
      } else {
        count = 0;
        that.time = data[1];
        render();
        requestAnimationFrame(run);
      }
    }

    run();
  }
});