
var stats = new FPSCounter(),
  scene = new Scene(),
  players = [];

for ( var i = 0; i < 11; i ++ ) {
  var player = new Player({ scene: scene });
  players.push(player);
}


animate();

function animate() {

  requestAnimationFrame( animate );

  players.forEach(function(player){
    player.update();
  });

  scene.update();
  stats.update();
}