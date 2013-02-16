var stats = new FPSCounter(),
  scene = new Scene();

animate();

var $time = $("#time");

var cache = {},
  index = 0,
  count = 0,
  lines;

var loader = new Loader();

loader.on("loaded", function(data){
  lines = data;
  run();
});

function run(){
  
  var line, data, id, player;

  line = lines[index++];

  if (!line) { return; }

  data = line.split(",");
  id = 1 * data[0];
  player = cache[id];

  if (!player){
    cache[id] = player;
    player = new Player({
      scene: scene,
      id: id
    });

    cache[id] = player;
  }

  player.update(data);

  if (id == 4){
    closest();
  }

  count++;

  if (count < 2000){
    run();
  } else {
    count = 0;
    var time = (data[1]-START) / 1e12;
    $time.html(Math.floor(time/60) + ":" + Math.round(time % 60));
    requestAnimationFrame(run);
  }
}

function closest(){

  var min = Infinity,
    d, select,
    ball = 8,
    all;

  if (!cache[ball]){ return; }

  for (all in cache){
    if (all != ball){
      d = distance(
        cache[8].position,
        cache[all].position
      );

      if ((d < min)){
        select = all;
        min = d;
      }
    }
  }

  var scale = 1,
    player;

  if (d > 50000){
    select = null;
  }

  for (all in cache){
    scale = (all == select) ? (d < 10000 ? 5 : 2.5) : 1;
    player = cache[all].mesh.scale;

    player.x = player.y = player.z = scale;

  }
}

function animate() {
  requestAnimationFrame( animate );

  scene.update();
  stats.update();
}