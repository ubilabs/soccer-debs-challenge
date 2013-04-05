Teams = Klass({

  TEAM1: [],
  TEAM2: [],

  players: [],

  init: function(players){
    var name, player;

    for (name in PLAYERS){
      player = players.players[name];
      this[player.team].push(player);
      this.players.push(player);
    }


    this.$team1 = document.createElement("li");
    this.$team2 = document.createElement("li");
    $("TEAM1").appendChild(this.$team1);
    $("TEAM2").appendChild(this.$team2);

  },

  render: function(){


    var total = 0,
      t1 = 0,
      t2 = 0;

    this.TEAM1.forEach(function(player){

      var time = player.possesionTime || 0;

      total += time;
      t1 += time;
    });

    this.TEAM2.forEach(function(player){

      var time = player.possesionTime || 0;

      total += time;
      t2 += time;
    });

    time = Math.round(t1 / 1e12);


    this.$team1.innerHTML = "jiijij";
    this.$team2.innerHTML = "ijdieowd";
  }
});