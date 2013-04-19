GLOBAL.Target = Klass({

  LENGTH: 10,
  SECONDS: 1.5,

  init: function(){

    this.vectors = [];

    if (IS_BROWSER){
      this.initBrowser();
    }
  },

  initBrowser: function(){
    var material = new THREE.LineBasicMaterial({
      color: 0x00FF00
    }), vector;

    this.geometry = new THREE.Geometry();

    for (var i = 0; i < this.LENGTH; i++){
      vector = new THREE.Vector3();
      this.vectors.push(vector);
      this.geometry.vertices.push(vector);
    }

    this.line = new THREE.Line(this.geometry, material);
    app.scene.add(this.line);

    this.box = new THREE.CubeGeometry(400, 400, 400);

    this.mesh = new THREE.Mesh( this.box, material );
    this.mesh.matrixAutoUpdate = true;

    app.scene.add( this.mesh );
  },

  render: function(){

    var ball = GAME.ball;

    if (!ball){ return; }

    var data = ball.data,
      v = data[5],
      factor = 1e4 * 1e3,
      vx = v * data[7] / factor,
      vy = v * data[8] / factor,
      vz = v * data[9] / factor,
      x, y, z,
      vector,
      time,
      goal;

    for (var i = 0; i < this.LENGTH; i++){
      time = (i/this.LENGTH) * this.SECONDS;
      vector = this.vectors[i];
      x = vx * time + ball.position.x;
      y = vy * time + ball.position.y;
      z = vz*time + ball.position.z - (0.5 * GRAVITY * time * time);
      z = Math.max(z, 0);
      if (vector){
        vector.set(x,y,z);
      }
    }

    goal = goalTarget(
      ball.position,
      { x: x, y: y, z: z }
    );

    GAME.shot = (
      ball.hit &&
      ball.acceleration > 55 &&
      goal.hit
    );

    if (GAME.shot && !IS_BROWSER){
      write("shot_on_goal", [
        data[1],
        GAME.current.player.name,
        data[2],
        data[3],
        data[4],
        data[5],
        data[6],
        data[7],
        data[8],
        data[9],
        data[10],
        data[11],
        data[12]
      ]);
    }

    if (IS_BROWSER){
      this.mesh.position.y = goal.y;
      this.mesh.position.x = goal.x;
      this.mesh.position.z = goal.z;

      this.geometry.verticesNeedUpdate = true;
    }
  }
});