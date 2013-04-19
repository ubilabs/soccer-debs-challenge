var dir = "./output/",
  files = {},
  fs = require("fs");

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

GLOBAL.write = function(file, entry){
  var stream = files[file];

  if (!stream){
    stream = fs.createWriteStream(dir + file + ".stream.csv");
    files[file] = stream;
  }
  
  stream.write(entry.join(",") + "\n");
};