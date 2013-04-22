var dir = "./output/",
  files = {},
  fs = require("fs"),
  silent = process.argv.indexOf("--no-output") >= 0;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

GLOBAL.write = function(file, entry){
  if (silent){ return; }

  var stream = files[file];

  if (!stream){
    stream = fs.createWriteStream(dir + file + ".stream.csv");
    files[file] = stream;
  }
  stream.write(entry.join(",") + "\n");
};