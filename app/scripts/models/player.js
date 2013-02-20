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

    if (!this.position){ return; };


    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.position.z = this.position.z;

    var scale = this.mesh.scale;

    scale.x = scale.y = scale.z = this.scale;

    if (this.tracer){
      this.tracer.update(this.position);
    }
  }
});
