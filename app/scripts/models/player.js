var Player = Model({

  geometry: new THREE.CylinderGeometry(0, MAXY/20/5, MAXY/20, 4, 1),

  material: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  }),

  init: function(options){

    this.scene = options.scene;

    this.speed = Math.random() / 10;

    this.mesh = new THREE.Mesh( this.geometry, this.material );
    this.mesh.position.x = ( Math.random() - 0.5 ) * MAXX;
    this.mesh.position.y = ( Math.random() - 0.5 ) * MAXY;
    this.mesh.position.z = ( Math.random() - 0.5 ) * 0;
    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = true;

    this.scene.add( this.mesh );

  },

  update: function(){
    this.mesh.rotation.z += this.speed;
  }
});