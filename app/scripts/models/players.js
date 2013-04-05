Players = Model({

  init: function(){

    var name, all;

    this.players = {};

    for (name in PLAYERS){
      this.players[name] = new Player(name);
    }

    console.log(this.players);
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