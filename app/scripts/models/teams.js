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

    var total, percent,
      t1 = 0,
      t2 = 0;

    this.TEAM1.forEach(function(player){
      t1 += player.possesionTime;
    });

    this.TEAM2.forEach(function(player){
      t2 += player.possesionTime;
    });

    total = t1 + t2;

    percent = Math.round((t1/total || 0) * 100);

    this.$team1.innerHTML = "<span class='name'>TEAM1</span>" + format(t1) + " : " + percent + "%";
    this.$team2.innerHTML = "<span class='name'>TEAM2</span>" + format(t2) + " : " + (100-percent) + "%";
  }
});