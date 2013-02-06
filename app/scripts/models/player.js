var Player = Model({

  geometry: new THREE.CylinderGeometry(0, 400, 1000, 4, 1),

  material: new THREE.MeshLambertMaterial({
    color: 0xffffff,
    shading: THREE.FlatShading
  }),

  init: function(options){

    this.scene = options.scene;

    this.speed = Math.random() / 10;

    this.mesh = new THREE.Mesh( this.geometry, this.material );

    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = true;

    this.scene.add( this.mesh );
  },

  update: function(data){

    if (!data){ return; }

    var x = 1 * data[2],
      y = 1 * data[3],
      z = 1 * data[4];

    this.mesh.position.x = x - MAXX/4;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }
});