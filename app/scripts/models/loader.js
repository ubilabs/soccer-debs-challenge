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
      this.trigger("loaded", data);
    }
  },

  loadInNode: function(){
    var fs = require('fs');
    console.log("Load file …");

    fs.readFile(this.file, function (err, data) {
      if (err) { throw err; }
      console.log("File loaded.");
      this.trigger("loaded", data.toString().split("\n"));
    }.bind(this));
  }
});