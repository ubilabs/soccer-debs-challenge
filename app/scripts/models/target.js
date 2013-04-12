Target = Klass({

  LENGTH: 10,
  SECONDS: 1.5,

  box: new THREE.CubeGeometry(400, 400, 400),

  init: function(){

    var material = new THREE.LineBasicMaterial({
      color: 0x00FF00
    }), vector;

    this.geometry = new THREE.Geometry();

    this.vectors = [];

    for (var i = 0; i < this.LENGTH; i++){
      vector = new THREE.Vector3();
      this.vectors.push(vector);
      this.geometry.vertices.push(vector);
    }

    this.line = new THREE.Line(this.geometry, material);
    app.scene.add(this.line);

    this.mesh = new THREE.Mesh( this.box, material );
    this.mesh.matrixAutoUpdate = true;

    app.scene.add( this.mesh );
  },

  render: function(ball){

    if (!ball){ return; }

    var data = ball.data,
      v = data[5],
      factor = 1e4 * 1e3,
      vx = v * data[7] / factor,
      vy = v * data[8] / factor,
      vz = v * data[9] / factor,
      x, y, z,
      min = vy < 0 ? MINY : -MINY,
      vector,
      time,
      ratio;

    for (var i = 0; i < this.LENGTH; i++){
      time = (i/this.LENGTH) * this.SECONDS;
      vector = this.vectors[i];
      x = vx * time + ball.position.x;
      y = vy * time + ball.position.y;
      z = vz*time + ball.position.z - (0.5 * GRAVITY * time * time);
      z = Math.max(z, 0);
      vector.set(x,y,z);
    }

    ratio = (ball.position.y - min) / (ball.position.y - y);

    y = ball.position.y + (y - ball.position.y) * ratio;
    x = ball.position.x + (x - ball.position.x) * ratio;
    z = ball.position.z + (z - ball.position.z) * ratio;

    z = Math.max(z, 0);

    this.mesh.position.y = y;
    this.mesh.position.x = x;
    this.mesh.position.z = z;

    if (
      ball.hit &&
      ball.acceleration > 55 &&
      ratio < 1 &&
      x > GOAL_XMIN &&
      x < GOAL_XMAX &&
      z < GOAL_Z
    ) {

      PAUSED = true;
    }


    this.geometry.verticesNeedUpdate = true;
  }
});