GLOBAL.Loader = Model({

  file: INPUT_FILE,

  init: function(){
    if (IS_BROWSER){
      this.loadInBrowser();
    } else {
      this.loadInNode();
    }
  },

  loadInBrowser: function(){
    this.xhr = new XMLHttpRequest();
    this.xhr.open('GET', this.file, true);
    this.xhr.onreadystatechange = this.ready;
    this.xhr.send();
  },

  ready: function(){
    if (this.xhr.readyState == 4){
      var data = this.xhr.responseText.split("\n");
      this.trigger("data", data);
    }
  },

  loadInNode: function(){
    var fs = require('fs'),
      sys = require('sys'),
      input = fs.createReadStream(this.file),
      callback = function(data){
        this.trigger("data", data);
      }.bind(this),
      last,
      count = 0,
      time = 0,
      lastGameTime = 0,
      start = new Date();

    input.on('data', function(data, lines) {
      lines = (data + "").split("\n");
      if (last){ lines[0] = last + lines[0]; }
      last = lines.pop();

      count += lines.length;

      var timeDiff = new Date() - time;

      if (timeDiff > 1000){
        time = new Date();

        var seconds = (new Date() - start) / 1000,
          portion = count / 49576080,
          speed = ((GAME.time - lastGameTime) / 1e12) / (timeDiff / 1000);

        lastGameTime = GAME.time;


        sys.print(
          "\r" +
          (portion * 100).toFixed(1) + "% - " +
          "Game: " + formatTime((GAME.time - TIMES.FIRST.START) / 1e12) + " - " +
          "Elapsed: " + formatTime(seconds) + " - " +
          "ETA: " + formatTime(seconds / portion) + " - " +
          "Speed: " + Math.round(speed*100) + "% - " +
          Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB Memory     "
        );
      }

      callback(lines);
    });

    input.on("end", function(){
      console.log(GAME.count);
    });
  }
});