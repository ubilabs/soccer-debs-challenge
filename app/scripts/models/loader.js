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

  }
});