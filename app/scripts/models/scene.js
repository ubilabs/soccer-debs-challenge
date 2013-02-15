var Scene = Model({
  init: function(){
    this.scene = new THREE.Scene();

    this.group = new THREE.Object3D();

    this.group.rotation.x = -Math.PI/2;
    this.group.rotation.y = 0.2;

    this.scene.add(this.group);

    this.scene.position.y = 90000;

    this.initCamera();
    this.initLight();
    this.initPane();
    this.initGoals();
    this.initRenderer();
    this.initControls();
  },

  initCamera: function(){
    var ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera( 60, ratio, 1, MAXX*20 );

    this.camera.position.x = MAXX*2;
  },

  initRenderer: function(){
    this.renderer = new THREE.WebGLRenderer( { antialias: false } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderer.domElement );
  },

  initControls: function(){
    this.controls = new THREE.TrackballControls( this.camera );

    this.controls.target = new THREE.Vector3(MAXX/2,0,0);

    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 0.1;
    this.controls.panSpeed = 0.8;

    this.controls.noZoom = false;
    this.controls.noPan = false;

    this.controls.dynamicDampingFactor = 0.3;
  },

  initPane: function(){
    var geometry = new THREE.Geometry(),
      material = new THREE.LineBasicMaterial({
        color: 0X666666
      });

    geometry.vertices.push(new THREE.Vector3(MAXX, MAXY, 0));
    geometry.vertices.push(new THREE.Vector3(0, MAXY, 0));
    geometry.vertices.push(new THREE.Vector3(0, -MAXY, 0));
    geometry.vertices.push(new THREE.Vector3(MAXX, -MAXY, 0));
    geometry.vertices.push(new THREE.Vector3(MAXX, MAXY, 0));

    var line = new THREE.Line(geometry, material);

    this.add(line);

    geometry.vertices.push(new THREE.Vector3(MAXX, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));

    line = new THREE.Line(geometry, material);

    this.add(line);
  },

  initGoals: function(){

    var _this = this,
      x1 = 20494.0,
      x2 = 31994,
      y = MAXY,
      z = 4440,
      material = new THREE.LineBasicMaterial({
        color: 0xFF0000
      });

    function goal(side){
      var geometry = new THREE.Geometry();

      geometry.vertices.push(new THREE.Vector3(x1, y, 0));
      geometry.vertices.push(new THREE.Vector3(x1, y, z));
      geometry.vertices.push(new THREE.Vector3(x2, y, z));
      geometry.vertices.push(new THREE.Vector3(x2, y, 0));

      var line = new THREE.Line(geometry, material);

      _this.add(line);
    }

    goal();
    y *= -1;
    material = new THREE.LineBasicMaterial({
      color: 0x0000ff
    });

    goal();

  },

  initLight: function(){
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 100000, 0, 100000 );

    this.add( light );

    light = new THREE.AmbientLight( 0x555555 );
    this.add( light );
  },

  add: function(object){
    this.group.add(object);
  },

  update: function(){
    this.renderer.render( this.scene, this.camera );
    this.controls.update();
  }
});