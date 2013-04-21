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
      start = new Date();

    input.on('data', function(data, lines) {
      lines = (data + "").split("\n");
      if (last){ lines[0] = last + lines[0]; }
      last = lines.pop();

      count += lines.length;

      if ((new Date() - time) > 1000){
        time = new Date();

        var seconds = (new Date() - start) / 1000,
          portion = count / 49576080,
          minutes = Math.floor(seconds/60);

        seconds = Math.abs(Math.round(seconds % 60));
        if (seconds < 10) { seconds = "0" + seconds; }

        sys.print(
          "\r" +
          (portion * 100).toFixed(1) + "% - " +
          minutes + ":" + seconds + " - ETA: " +
          Math.round(seconds * 1 / portion) + "s - " +
          Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + "MB Memory"
        );
      }

      callback(lines);
    });

    input.on("end", function(){
      console.log(GAME.count);
    });
  }
});