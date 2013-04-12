HHH = 0;

Heatmap = Klass({

  init: function(player, x, y){

    this.player = player;

    this.x = x;
    this.y = y;

    this.height = 1/this.x * HEIGHT;
    this.width = 1/this.y * WIDTH;

    this.size = this.height;

    this.cells = [];
    this.colors = [];

    this.vertices = [];

    this.count = 0;

    this.initCells();

    this.initGeometry();
  },

  initGeometry: function(){

    this.geometry = new THREE.Geometry();
    this.material =  new THREE.ParticleBasicMaterial({
      size: this.size,
      color: 0xFFFF00,
      vertexColors: true
    });

    this.geometry.vertices = this.vertices;

    if (++HHH != 8){ return; }

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
      vertex = new THREE.Vector3();

    x = x / this.x * HEIGHT;
    y = y / this.y * WIDTH + MINY;

    vertex.x = x + this.height/2;
    vertex.y = y + this.width/2;
    vertex.z = -this.size;

    this.colors.push(color);

    this.cells.push({
      x: { min: x, max: x + this.height },
      y: { min: y, max: y + this.width },
      color: color,
      count: 0
    });

    this.vertices.push(vertex);
  },

  render: function(time){

    if (this.lastUpdate){
      if ((time-this.lastUpdate) / 1e12 < 1){ return; }
    }

    this.lastUpdate = time;

    var position = this.player.position;

    this.count++;

    var count = this.count;

    var max = 0,
      i,
      value,
      cell;

    for (i=0; i<this.cells.length; i++){
      cell = this.cells[i];
      if (
        position.x >= cell.x.min &&
        position.x <  cell.x.max &&
        position.y >= cell.y.min &&
        position.y <  cell.y.max
      ) {
        cell.count++;
      }
      max = Math.max(cell.count, max);
    }

    for (i=0; i<this.cells.length; i++){
      cell = this.cells[i];
      value = (cell.count / max) || 0;

      value = Math.max(value, 0.1);
      cell.color.r = value;
      cell.color.g = value;
      cell.color.b = 0;
    }

    this.geometry.colorsNeedUpdate = true;
  }
});