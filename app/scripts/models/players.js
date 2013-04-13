GLOBAL.Players = Model({

  init: function(){
    this.players = {};
    for (var name in PLAYERS){
      this.players[name] = new Player(name);
    }
  },

  add: function(sensor){
    var player = this.players[sensor.name];
    if (!player){ return; }

    player.addSensor(sensor);
    sensor.player = player;
  },

  render: function(time){
    for (var all in this.players){
      this.players[all].render(time);
    }
  }
});