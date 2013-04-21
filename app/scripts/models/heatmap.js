HHH = 0;

GLOBAL.Heatmap = Klass({

  init: function(player, xSize, ySize){

    this.player = player;
    this.cache = new Cache(1);

    this.xSize = xSize;
    this.ySize = ySize;
    this.size = xSize * ySize;

    this.streamName = "heatmap_" + this.xSize + "x" + this.ySize;

    this.output = [];
    this.output[1] = this.player.name;

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
      color: 0xFFFFFF,
      blending: THREE.AdditiveBlending,
      transparent: true,
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

    for (y=0; y < this.ySize; y++){
      for (x=0; x < this.xSize; x++){
        this.addCell(x, y, index++);
      }
    }
  },

  addCell: function(x, y, index){

    x = x / this.xSize * HEIGHT + MINX;
    y = y / this.ySize * WIDTH + MINY;

    var i = index * 5 + 2;

    this.output[i+0] = Math.round(x);
    this.output[i+1] = Math.round(x + this.height);
    this.output[i+2] = Math.round(y);
    this.output[i+3] = Math.round(y + this.width);

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

    if (
      this.lastUpdate &&
      ((time-this.lastUpdate) / 1e12 < 1)
    ){
      return;
    }

    this.lastUpdate = time;

    var position = this.player.position,
      x = -1,
      y = -1,
      index = -1;


    if (
      position.x > MINX &&
      position.x < MAXX &&
      position.y > MINY &&
      position.y < MAXY
    ) {
      x = Math.floor((position.x - MINX) / HEIGHT * this.xSize);
      y = Math.floor((position.y - MINY) / WIDTH * this.ySize);
      index = (y * this.xSize) + x;
    }

    this.cache.set(time, index);
    this.renderTimeframe(time);
  },

  renderTimeframe: function(time){

    if (IS_BROWSER && !this.geometry){ return; }

    var t = new Date();

    this.output[0] = time;

    var values, minutes, i, count, output, j;

    function callback(index){
      count++;
      values[index] = (values[index] || 0) + 1;
    }

    for (j = 0; j < TIME_WINDOWS.length; j++){
      minutes = TIME_WINDOWS[j];
      values = [];
      count = 0;
      this.cache.last(minutes*60, callback);

      for (i = 0; i<this.size; i++){
        this.output[i*5 + 4 + 2] = 100 * (values[i] || 0) / count;
      }

      write(this.streamName + "_" + minutes, this.output);

      if (IS_BROWSER){ break; }
    }

    if (!this.geometry){ return; }

    console.log(minutes, new Date() - t);

    this.renderBrowser(values);
  },

  renderBrowser: function(cells){

    if (!this.geometry){ return; }

    var i, value, count,
      max = 0;

    for (i=0; i<this.size; i++){
      max = Math.max(max, cells[i] || 0);
    }

    for (i=0; i<this.size; i++){
      count = cells[i];
      value = count / max || 0;

      color = this.colors[i];
      color.r = value;
      color.g = value;
      color.b = 0;
    }

    this.geometry.colorsNeedUpdate = true;

  }
});