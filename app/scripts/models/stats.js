GLOBAL.FPSCounter = Model({
  init: function(){
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    document.body.appendChild( stats.domElement );
    this.stats = stats;
  },

  update: function(){
    this.stats.update();
  }
});