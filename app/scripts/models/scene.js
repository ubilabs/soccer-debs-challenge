var Scene = Model({
  init: function(){
    this.scene = new THREE.Scene();
    this.initCamera();
    this.initLight();
    this.initPane();
    this.initRenderer();
    this.initControls();
  },

  initCamera: function(){
    var ratio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera( 60, ratio, 1, MAXX*2 );
    this.camera.position.y = -MAXX;
    this.camera.position.z = MAXX/2;
  },

  initRenderer: function(){
    this.renderer = new THREE.WebGLRenderer( { antialias: false } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderer.domElement );
  },

  initControls: function(){
    this.controls = new THREE.TrackballControls( this.camera );

    this.controls.rotateSpeed = 2.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;

    this.controls.noZoom = true;
    this.controls.noPan = true;

    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
  },

  initPane: function(){
    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry( MAXX, MAXY, 10, 10 ),
      new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } )
    );

    this.add( plane );
  },

  initLight: function(){
    var light = new THREE.DirectionalLight( 0xffffff );
    light.position.set( 0, 0, 100000 );

    this.add( light );

    light = new THREE.AmbientLight( 0x222222 );
    this.add( light );
  },

  add: function(object){
    this.scene.add(object);
  },

  update: function(){
    this.renderer.render( this.scene, this.camera );
    this.controls.update();
  }
});