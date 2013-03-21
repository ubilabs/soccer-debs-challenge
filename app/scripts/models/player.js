Player = Model({

  geometry: new THREE.CubeGeometry(400, 400, 400),

  init: function(id){
    this.scene = app.scene;
    this.id = id*1;

    this.IS_BALL = this.id == 8;

    this.initTypeAndColor();
    this.initMesh();

    this.initTracer();
  },

  initTypeAndColor: function(){

    for (var id in TYPES){
      if (MAPPING[id].indexOf(this.id) >= 0){
        this.type = TYPES[id];
      }
    }

    this.color = COLORS[this.type] || "#0F0";

    for (var name in PLAYERS){
      if (PLAYERS[name].indexOf(this.id) > -1){
        this.name = name;
      }
    }
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

    if (!this.position){ return; }

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
