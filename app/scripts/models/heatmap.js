HHH = 0;

Heatmap = Klass({

  init: function(player){


    this.player = player;

    this.x = 20;
    this.y = 20;

    this.size = 1000;

    this.cells = [];
    this.colors = [];

    if (++HHH != 8){ return; }

    this.count = 0;

    this.geometry = new THREE.Geometry();
    this.material =  new THREE.ParticleBasicMaterial({
      size: this.size,
      color: 0xFFFF00,
      vertexColors: true
    });

    this.initCells();

    this.geometry.colors = this.colors;

    this.particles = new THREE.ParticleSystem(this.geometry, this.material);

    app.scene.add( this.particles );

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
    var color = new THREE.Color(),
      vertex = new THREE.Vector3(),
      height = 1/this.x * HEIGHT,
      width = 1/this.y * WIDTH;

    x = x / this.x * HEIGHT;
    y = y / this.y * WIDTH + MINY;

    vertex.x = x + height/2;
    vertex.y = y + width/2;
    vertex.z = 0;

    this.geometry.vertices.push( vertex );
    this.colors.push(color);

    this.cells.push({
      x: { min: x, max: x + height },
      y: { min: y, max: y + width },
      color: color,
      count: 0
    });
  },

  render: function(){

    if (!this.geometry){ return; }

    var position = this.player.position;

    this.count++;

    var count = this.count;

    var max = 0;

    this.cells.forEach(function(cell){
      if (
        position.x >= cell.x.min &&
        position.x <  cell.x.max &&
        position.y >= cell.y.min &&
        position.y <  cell.y.max
      ) {
        cell.count++;
      }
      max = Math.max(cell.count, max);
    });


    this.cells.forEach(function(cell){
      var value = (cell.count / max) || 0;

      value = Math.max(value, 0.1);
      cell.color.setHSV(0.1, 0, value);
    });

    //console.log(this.cells);

    this.geometry.colorsNeedUpdate = true;


  } 
});