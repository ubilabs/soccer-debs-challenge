Players = Model({

  init: function(){

    var name, all;

    this.players = {};

    for (name in PLAYERS){
      this.players[name] = new Player(name);
    }

    console.log(this.players);
  },

  add: function(entry){
    var player = this.players[entry.name];
    if (!player){ return; }

    player.addLeg(entry);
    entry.player = player;
  },

  render: function(time){
    for (var all in this.players){
      this.players[all].render(time);
    }
  }
});