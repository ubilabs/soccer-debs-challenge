var container, stats;

var camera, controls, scene, renderer, meshes = [];


var MAXX = 105000;
var MAXY = 68000;

camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, MAXX*2 );
camera.position.y = -MAXX;
camera.position.z = MAXX/2;

controls = new THREE.TrackballControls( camera );

controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;

controls.noZoom = true;
controls.noPan = true;

controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

controls.addEventListener( 'change', render );

// world

scene = new THREE.Scene();

var geometry = new THREE.CylinderGeometry( 0, MAXY/20/5, MAXY/20, 4, 1 );

var material =  new THREE.MeshLambertMaterial({
  color: 0xffffff,
  shading: THREE.FlatShading
});

for ( var i = 0; i < 5; i ++ ) {
  mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = ( Math.random() - 0.5 ) * MAXX;
  mesh.position.y = ( Math.random() - 0.5 ) * MAXY;
  mesh.position.z = ( Math.random() - 0.5 ) * 0;
  mesh.updateMatrix();
  mesh.matrixAutoUpdate = true;
  meshes.push(mesh);
  scene.add( mesh );
}


// lights

light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0, 0, 100000 );
scene.add( light );


light = new THREE.AmbientLight( 0x222222 );
scene.add( light );

plane = new THREE.Mesh(
  new THREE.PlaneGeometry( MAXX, MAXY, 10, 10 ),
  new THREE.MeshBasicMaterial( { color: 0x555555, wireframe: true } )
);

//plane.rotation.x = - Math.PI / 2;
scene.add( plane );


// renderer

renderer = new THREE.WebGLRenderer( { antialias: false } );

// scene.fog = new THREE.FogExp2( 0x000000, 0.002 );
// renderer.setClearColor( scene.fog.color, 1 );

renderer.setSize( window.innerWidth, window.innerHeight );


document.body.appendChild( renderer.domElement );

stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
stats.domElement.style.zIndex = 100;
document.body.appendChild( stats.domElement );

window.addEventListener( 'resize', onWindowResize, false );

animate();



function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  controls.handleResize();
  render();

}

function animate() {

  requestAnimationFrame( animate );
  controls.update();

  meshes.forEach(function(mesh){
    mesh.rotation.x += 0.01;
  });

  render();

}

function render() {

  renderer.render( scene, camera );
  stats.update();

}