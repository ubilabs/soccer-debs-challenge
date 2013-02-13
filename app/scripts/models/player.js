var COLORS = {
  "#FFF": [4,8,10,12],
  "#F00": [13,14,97,98,47,16,49,88,19,52,53,54,23,24,57,58,59,28],
  "#00F": [61,62,99,100,63,64,65,66,67,68,69,38,71,40,73,74,75,44],
  "#F0F": [105,106]
};

var Player = Model({

  geometry: new THREE.CubeGeometry(400, 400, 400),

  init: function(options){

    this.scene = options.scene;

    this.id = options.id;

    var color = "#0F0";

    for (var hex in COLORS){
      if (COLORS[hex].indexOf(this.id) >= 0){
        color = hex;
      }
    }

    var material = new THREE.MeshLambertMaterial({
      color: color
    });

    this.mesh = new THREE.Mesh( this.geometry, material );

    this.mesh.updateMatrix();
    this.mesh.matrixAutoUpdate = true;

    this.scene.add( this.mesh );
  },

  update: function(data){

    if (!data){ return; }

    var x = 1 * data[2],
      y = 1 * data[3],
      z = 1 * data[4];

    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
  }
});