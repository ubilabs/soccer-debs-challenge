var stats = new FPSCounter(),
  scene = new Scene();

animate();

var $time = $("#time");

$.get("/data/1000.csv", function(data){
  var lines = data.split("\n");

  var cache = {};
  var count = 0;
  var index = 0;

  function next(){

    if (index == lines.length){
      return;
    }

    var line = lines[index++],
      data = line.split(","),
      id = 1*data[0],
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

    if (count++ < 1500){
      next();
    } else {
      count = 0;
      var time = data[1] / 1e12;
      $time.html(Math.round(time));
      requestAnimationFrame(next);
    }
  }

  next();


}, "text");

function animate() {

  requestAnimationFrame( animate );

  scene.update();
  stats.update();
}