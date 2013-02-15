var stats = new FPSCounter(),
  scene = new Scene();

animate();

var $time = $("#time");


var xhr = new XMLHttpRequest();

var stopped = true;

xhr.open('GET', '/data/1000.csv', true);

xhr.onreadystatechange = function(event) {

  if (this.readyState == 4 && this.responseText.length && stopped){
    stopped = false;
    run();
  }
};

xhr.send();

var cache = {},
  index = 0,
  count = 0,
  lines;

function run(){

  if (stopped){ return; }

  if (!lines){
    var t = new Date();
    lines = xhr.responseText.split("\n");
    console.log("parsing", lines.length, "lines in", new Date() - t, "ms");
  }
  
  var line, data, id, player;

  if (index >= lines.length-1){
    stopped = true;
    lines = null;
    return;
  }

  line = lines[index];
  index++;
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

  var time = data[1] / 1e12;
  $time.html(Math.round(time));

  count++;

  if (count < 1000){
    run();
  } else {
    count = 0;
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

      //console.log(all, d, min);

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

  window.d = d;
}

function animate() {
  requestAnimationFrame( animate );

  scene.update();
  stats.update();
}