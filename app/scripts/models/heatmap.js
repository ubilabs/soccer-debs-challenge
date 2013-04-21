HHH = 0;

GLOBAL.Heatmap = Klass({

  cells: [],
  count: 0,

  init: function(player, xSize, ySize){

    this.player = player;

    this.xSize = xSize;
    this.ySize = ySize;
    this.size = xSize * ySize;

    this.height = 1/this.xSize * HEIGHT;
    this.width = 1/this.ySize * WIDTH;

    this.cells = [];

    if (IS_BROWSER){
      this.vertices = [];
      this.colors = [];
    }

    this.initCells();
    this.initBrowserGeometry();
  },

  initBrowserGeometry: function(){

    if (!IS_BROWSER){ return; }
    if (++HHH != 9){ return; }

    this.geometry = new THREE.Geometry();
    this.material =  new THREE.ParticleBasicMaterial({
      size: this.height,
      color: 0x333300,
      vertexColors: true
    });

    this.geometry.vertices = this.vertices;

    this.geometry.colors = this.colors;

    this.particles = new THREE.ParticleSystem(
      this.geometry,
      this.material
    );

    app.scene.add( this.particles );
  },

  initCells: function(){
    var x, y, index = 0;

    this.cellz = new Int32Array(this.size * 5);

    for (x=0; x < this.xSize; x++){
      for (y=0; y < this.ySize; y++){
        this.addCell(x, y, index++);
      }
    }
  },

  addCell: function(x, y, index){

    x = x / this.xSize * HEIGHT;
    y = y / this.ySize * WIDTH + MINY;

    var cell = {
      count: 0
    };

    var i = index*5;

    this.cellz[i+0] = x;
    this.cellz[i+1] = x + this.height;
    this.cellz[i+2] = y;
    this.cellz[i+3] = y + this.width;
    this.cellz[i+4] = 0;

    this.cells.push(cell);
    this.addBrowserCell(x, y, cell);
  },

  addBrowserCell: function(x, y, cell){

    if (!IS_BROWSER){ return; }

    var color = new THREE.Color(),
      vertex = new THREE.Vector3();

    vertex.x = x + this.height/2;
    vertex.y = y + this.width/2;
    vertex.z = -this.height;

    this.colors.push(color);
    this.vertices.push(vertex);

    cell.color = color;
  },

  render: function(time){

    var t = new Date();

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

    for (i=0; i<this.size; i++){
      cell = this.cells[i];
      if (
        position.x >= this.cellz[i*5+0] &&
        position.x <  this.cellz[i*5+1] &&
        position.y >= this.cellz[i*5+2] &&
        position.y <  this.cellz[i*5+3]
      ) {
        cell.count++;
      }
      max = Math.max(cell.count, max);
    }

    this.renderBrowser(max);

    if (this.ySize === 100){
      console.log(new Date()-t);
    }
  },

  renderBrowser: function(max){

    if (!this.geometry){ return; }

    var i, cell, value;

    for (i=0; i<this.size; i++){
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