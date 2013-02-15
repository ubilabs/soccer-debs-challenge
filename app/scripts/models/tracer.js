Tracer = Model({

  init: function(options){
    this.start = new THREE.Vector3();
    this.end = new THREE.Vector3();

    var material = new THREE.LineBasicMaterial({
      color: 0XFFFF00
    });

    this.geometry = new THREE.Geometry();

    this.geometry.vertices.push(this.start);
    this.geometry.vertices.push(this.end);

    this.line = new THREE.Line(this.geometry, material);
    options.scene.add(this.line);
  },

  update: function(position){
    
    if (this.position){
      this.end.set(
        position.x,
        position.y,
        position.z
      );

      this.start.set(
        this.position.x,
        this.position.y,
        this.position.z
      );

      this.geometry.verticesNeedUpdate = true;
    }

    this.position = position;
      
  }
});