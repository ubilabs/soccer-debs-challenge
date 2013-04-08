HHH = false;

Heatmap = Klass({

  init: function(player){


    this.player = player;

    this.x = 64;
    this.y = 100;

    this.cells = [];

    if (HHH){ return; }
    HHH = true;

    this.counter = 0;

    this.initCells();
  },

  initCells: function(){
    var x, y;

    for (x=0; x < this.x; x++){
      for (y=0; y < this.y; y++){
        this.addCell(x, y);
      }
    }
  },

  addCell: function(x, y){
    var height = 1/this.x,
      width = 1/this.y,
      plane = new THREE.PlaneGeometry(height*HEIGHT-100, width*WIDTH-100),
      material = new THREE.MeshBasicMaterial({ color: 0xFF0000, opacity: Math.random()/1000 }),
      mesh = new THREE.Mesh(plane, material);

    mesh.material.color.r = Math.random();

    x = x / this.x + height/2;
    y = y / this.y + width/2;

    mesh.position.x = x * HEIGHT;
    mesh.position.y = y * WIDTH + MINY;

    app.scene.add(mesh, material);

    this.cells.push(mesh);
  },

  render: function(){

    if (this.counter++ % 50) { return }

    this.cells.forEach(function(cell){
      cell.material.color.r = Math.random();
    });
  } 
});