GLOBAL.Sensor = Model({

  init: function(id){
    this.id = id*1;

    this.initTypeAndColor();

    if (IS_BROWSER){
      this.initBrowser();
    }
  },

  initBrowser: function(){
    this.scene = app.scene;

    this.geometry = new THREE.CubeGeometry(400, 400, 400);
    this.scale = 1;

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

    this.IS_BALL = this.type == "BALL";
    this.IS_PLAYER = (this.type == "TEAM1" || this.type == "TEAM2");

    if (this.IS_PLAYER){
      this.team = this.type;
      for (var name in PLAYERS){
        if (PLAYERS[name].indexOf(this.id) > -1){
          this.name = name;
        }
      }
    }
  },

  initMesh: function(){
    var material = new THREE.MeshLambertMaterial({
      color: this.color
    });

    this.mesh = new THREE.Mesh( this.geometry, material );

    this.mesh.matrixAutoUpdate = true;

    app.scene.add( this.mesh );
  },

  initTracer: function(){

    if (!this.IS_BALL){
      return;
    }

    this.tracer = new Tracer({
      scene: this.scene,
      color: this.color
    });
  },

  renderInBrowser: function(){
    if (!this.position){ return; }

    this.mesh.position.x = this.position.x;
    this.mesh.position.y = this.position.y;
    this.mesh.position.z = this.position.z;

    var scale = this.mesh.scale;

    scale.x = scale.y = scale.z = this.scale;

    if (this.tracer && this.active){
      this.tracer.update(this.position);
    }
  }
});
