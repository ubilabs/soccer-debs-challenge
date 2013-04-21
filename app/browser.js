var port = 9000,
  host = "0.0.0.0",
  fs = require("fs"),

  samples = './data/samples.csv',
  source = './data/full-game',
  server,
  last,
  count = 0;

if (!fs.existsSync(source)){
  console.error("ERROR!\n");
  console.error("Input file '" + source + "' not found.");
  console.error("Please download and extract to '/data' directory.");
  console.error("http://lafayette.tosm.ttu.edu/debs2013/grandchallenge/full-game.gz\n");
  return;
}

if (!fs.existsSync(samples)){
  var input = fs.createReadStream(source, { start: 4255018857 - 171457178 }),
    output = fs.createWriteStream(samples);

  input.pipe(output);
  input.on("end", start);
} else {
  start();
}

function start(){
  var httpServer = require("./scripts/vendor/http-server"),
    server = httpServer.createServer({ root: "." });

  server.listen(port, host, function() {
    console.log("Server started at : http://localhost:" + port);
  });
}