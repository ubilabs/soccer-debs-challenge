Tracer = Model({

  LENGTH: 500,

  init: function(options){

    var material = new THREE.LineBasicMaterial({
      color: 0xFFFF00
    }), vector;

    this.geometry = new THREE.Geometry();

    this.vectors = [];
    this.positions = [];

    for (var i = 0; i < this.LENGTH; i++){
      vector = new THREE.Vector3();
      this.vectors.push(vector);
      this.geometry.vertices.push(vector);
    }

    this.line = new THREE.Line(this.geometry, material);
    options.scene.add(this.line);

    this.count = 0;
  },

  update: function(position){

    var old = this.position;

    if (this.count++ %20 != 0){
      return;
    }

    this.positions.push(position);

    this.positions = this.positions.slice(-this.LENGTH);
    
    this.positions.forEach(function(position, index){
      this.vectors[index].set(
        position.x,
        position.y,
        position.z
      );
    }.bind(this));

    this.geometry.verticesNeedUpdate = true;      
  }
});