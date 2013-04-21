var scripts = [

  "bridge",
  "vendor/klass",
  "vendor/fishbone",

  "settings",
  "helpers",

  "models/writer",

  "models/stats",
  "models/loader",
  "models/game",
  "models/cache",
  "models/scene",
  "models/tracer",
  "models/player",
  "models/teams",
  "models/running",
  "models/players",
  "models/cell",
  "models/heatmap",
  "models/target",
  "models/sensor",

  "main"
];

for (var all in scripts){
  var script = "./scripts/" + scripts[all] + ".js";
  require(script);
}