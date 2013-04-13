HHH = 0;

GLOBAL.Heatmap = Klass({

  cells: [],
  count: 0,

  init: function(player, x, y){

    this.player = player;

    this.x = x;
    this.y = y;

    this.height = 1/this.x * HEIGHT;
    this.width = 1/this.y * WIDTH;

    this.size = this.height;

    if (IS_BROWSER){
      this.vertices = [];
      this.colors = [];
    }

    this.initCells();
    this.initBrowserGeometry();
  },

  initBrowserGeometry: function(){

    if (!IS_BROWSER){ return; }

    this.geometry = new THREE.Geometry();
    this.material =  new THREE.ParticleBasicMaterial({
      size: this.size,
      color: 0xFFFF00,
      vertexColors: true
    });

    this.geometry.vertices = this.vertices;

    if (++HHH != 8){ return; }

    this.geometry.colors = this.colors;

    this.particles = new THREE.ParticleSystem(
      this.geometry,
      this.material
    );

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

    x = x / this.x * HEIGHT;
    y = y / this.y * WIDTH + MINY;

    var cell = {
      x: { min: x, max: x + this.height },
      y: { min: y, max: y + this.width },
      count: 0
    };

    this.cells.push(cell);
    this.addBrowserCell(x, y, cell);
  },

  addBrowserCell: function(x, y, cell){
    var color = new THREE.Color(),
      vertex = new THREE.Vector3();

    vertex.x = x + this.height/2;
    vertex.y = y + this.width/2;
    vertex.z = -this.size;

    this.colors.push(color);
    this.vertices.push(vertex);

    cell.color = color;
  },

  render: function(time){

    if (this.lastUpdate){
      if ((time-this.lastUpdate) / 1e12 < 1){ return; }
    }

    this.lastUpdate = time;

    this.count++;

    var position = this.player.position,
      max = 0,
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

    this.renderBrowser(max);
  },

  renderBrowser: function(max){
    if (!IS_BROWSER){ return; }

    var i, cell, value;

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