Runner = Model({

  init: function(lines, scene){

    var that = this,
      count = 0,
      index = 0;

      players = {};

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
      for (all in players){
        players[all].update();
      }
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
        console.log("GOAL");
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

      if (player.IS_BALL){
        checkHit();
        checkGoal(player);
      }

      if (++count < 4000){
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