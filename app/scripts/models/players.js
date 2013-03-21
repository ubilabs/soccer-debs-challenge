Players = Model({

  init: function(){
    this.players = {};

    for (var name in PLAYERS){
      this.players[name] = [];
    }
  },

  add: function(entry){
    var player = this.players[entry.name];
    if (!player){ return; }

    player.push(entry);

    return player;
  }
});