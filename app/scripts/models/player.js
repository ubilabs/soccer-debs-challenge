Player = Model({

  TYPES: {
    BALL: [4,8,10,12],
    RED: [13,14,97,98,47,16,49,88,19,52,53,54,23,24,57,58,59,28],
    BLUE: [61,62,99,100,63,64,65,66,67,68,69,38,71,40,73,74,75,44],
    NEUTRAL: [105,106]
  },

  COLORS: {
    BALL: "#FFF",
    RED: "#F00",
    BLUE: "#00F",
    NEUTRAL: "#F0F"
  },

  geometry: new THREE.CubeGeometry(400, 400, 400),

  init: function(id){
    this.scene = app.scene;
    this.id = id;

    this.IS_BALL = this.id == 8;

    this.initTypeAndColor();
    this.initMesh();

    this.initTracer();
  },

  initTypeAndColor: function(){

    for (var id in this.TYPES){
      if (this.TYPES[id].indexOf(this.id*1) >= 0){
        this.type = id;
      }
    }

    this.color = this.COLORS[this.type] || "#0F0";
  },

  initMesh: function(){
    var material = new THREE.MeshLambertMaterial({
      color: this.color
    });

    this.mesh = new THREE.Mesh( this.geometry, material );

    this.mesh.matrixAutoUpdate = true;

    this.scene.add( this.mesh );
  },

  initTracer: function(){
  
    if (this.type != "BALL"){
      return;
    }

    this.tracer = new Tracer({
      scene: this.scene,
      color: this.color
    });
  },

  update: function(data){

    if (!data){ return; }

    var oldPosition = this.position,
      oldTime = this.time,
      diffTime;

    this.time = 1 * data[1];

    diffTime = this.time - oldTime;

    this.position = {
      x: 1 * data[2],
      y: 1 * data[3],
      z: 1 * data[4]
    };

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.position.z = this.position.z;

    if (this.tracer){
      this.tracer.update(this.position);

      this.c = this.c || 0;

      this.c++;

      if (this.id == 4 && this.c % 10000 == 10){
        this.distance = distance(oldPosition, this.position);
        this.speed = speed(this.distance, diffTime);
        
        // console.log(this.position, oldPosition);
        // console.log(this.distance.toFixed(2), this.speed.toFixed(4), data[5]);
      }

    }
  }
});

Player.cache = {};

Player.get = function(id){
  var player = Player.cache[id] || (Player.cache[id] = new Player(id));
  return player;
};
