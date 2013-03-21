Players = Model({

  init: function(){

    var name, all;

    this.players = {};

    for (name in PLAYERS){
      player = [];
      player.possesionTime = 0;
      player.name = name;

      this.players[name] = player;
    }

    console.log(this.players)
  },

  add: function(entry){
    var player = this.players[entry.name];
    if (!player){ return; }

    player.team = entry.type;

    entry.player = player;
    player.push(entry);

  }
});