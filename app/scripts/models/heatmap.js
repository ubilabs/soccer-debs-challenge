HHH = 0;

GLOBAL.Heatmap = Klass({

  init: function(player, xSize, ySize){

    this.player = player;

    this.xSize = xSize;
    this.ySize = ySize;
    this.size = xSize * ySize;

    this.height = 1/this.xSize * HEIGHT;
    this.width = 1/this.ySize * WIDTH;

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

    var i = index*5;

    this.cellz[i+0] = x;
    this.cellz[i+1] = x + this.height;
    this.cellz[i+2] = y;
    this.cellz[i+3] = y + this.width;
    this.cellz[i+4] = 0;

    this.addCellInBrowser(x, y);
  },

  addCellInBrowser: function(x, y){

    if (!IS_BROWSER){ return; }

    var color = new THREE.Color(),
      vertex = new THREE.Vector3();

    vertex.x = x + this.height/2;
    vertex.y = y + this.width/2;
    vertex.z = -this.height;

    this.colors.push(color);
    this.vertices.push(vertex);
  },

  render: function(time){

    if (this.lastUpdate){
      if ((time-this.lastUpdate) / 1e12 < 1){ return; }
    }

    this.lastUpdate = time;

    var position = this.player.position,
      cells = [],
      i;

    this.cells = this.cells  || [];
    cells = this.cells;

    var x = -1,
      y = -1,
      index = -1;

    if (
      position.x > MINX &&
      position.x < MAXX &&
      position.y > MINY &&
      position.y < MAXY
    ) {
      x = Math.floor((position.x - MINX) / WIDTH * this.xSize);
      y = Math.floor((position.y - MINY) / HEIGHT * this.ySize);
      index = (y * this.xSize) + x;
      cells[index] = (cells[index] || 0) + 1;
    }

    this.renderBrowser(cells);
  },

  renderBrowser: function(cells){

    if (!this.geometry){ return; }

    var i, value, count,
      max = 0;

    for (i=0; i<this.size; i++){
      max = Math.max(max, cells[i] || 0);
    }

    for (i=0; i<this.size; i++){
      count = cells[i] || 0;
      value = count / max || 0;

      color = this.colors[i];
      color.r = value;
      color.g = value;
      color.b = 0;
    }

    this.geometry.colorsNeedUpdate = true;

  }
});