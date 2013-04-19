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
      input = fs.createReadStream(this.file),
      callback = function(data){
        this.trigger("data", data);
      }.bind(this),
      last;

    input.on('data', function(data, lines) {
      lines = (data + "").split("\n");
      if (last){ lines[0] = last + lines[0]; }
      last = lines.pop();
      callback(lines);
    });

    input.on("end", function(){
      console.log(GAME.count);
    });
  }
});