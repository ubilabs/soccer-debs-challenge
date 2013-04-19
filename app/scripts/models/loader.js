GLOBAL.Loader = Model({

  file: './data/samples.csv',

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
          portion = count / 49576080;

        sys.print(
          "\r" +
          (portion * 100).toFixed(1) + "% - " +
          Math.round(seconds) + "s - ETA: " +
          Math.round(seconds * 1 / portion) + "s"
        );
      }

      callback(lines);
    });

    input.on("end", function(){
      console.log(GAME.count);
    });
  }
});