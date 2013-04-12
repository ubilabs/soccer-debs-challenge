Target = Klass({

  LENGTH: 10,
  SECONDS: 1.5,

  init: function(){

    var material = new THREE.LineBasicMaterial({
      color: 0xFF00FF
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
  },

  render: function(ball){

    if (!ball){ return; }

    var data = ball.data,
      seconds = 1.5,
      v = data[5],
      factor = 1e4 * 1e3,
      vx = v * data[7] / factor,
      vy = v * data[8] / factor,
      vz = v * data[9] / factor,
      time;

    for (var i = 0; i < this.LENGTH; i++){
      time = (i/this.LENGTH) * seconds;
      this.vectors[i].set(
        vx*time + ball.position.x,
        vy*time + ball.position.y,
        Math.abs(vz*time + ball.position.z - (0.5 * GRAVITY * time * time), 0)
      );
    }

    this.geometry.verticesNeedUpdate = true;
  }
});