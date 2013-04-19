GLOBAL.Teams = Klass({

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

    if (IS_BROWSER){
      this.initBrowser();
    }
  },

  initBrowser: function(){
    this.$team1 = document.createElement("li");
    this.$team2 = document.createElement("li");
    $("TEAM1").appendChild(this.$team1);
    $("TEAM2").appendChild(this.$team2);
  },

  render: function(){

    TIME_WINDOWS.forEach(function(timeframe){
      var total, percent,
        stream = "team_ball_possesion_t",
        t1 = 0,
        t2 = 0;

      this.TEAM1.forEach(function(player){
        t1 += player.possesionTimeframe(timeframe * 1e12 * 60);
      });

      this.TEAM2.forEach(function(player){
        t2 += player.possesionTimeframe(timeframe * 1e12 * 60);
      });

      total = t1 + t2;

      percent = Math.round((t1/total || 0) * 100);

      if (IS_BROWSER){
        if (timeframe == 5){
          this.renderInBrowser(percent, t1, t2);
        }
      } else {
        write(stream + timeframe, [GAME.time, 1, t1, percent]);
        write(stream + timeframe, [GAME.time, 2, t2, 100-percent]);
      }

    }.bind(this));

  },

  renderInBrowser: function(percent, t1, t2){

    this.$team1.innerHTML = "<span class='name'>= " + percent + "%</span><span>" + format(t1) + "s</span>";
    this.$team2.innerHTML = "<span class='name'>= " + (100-percent) + "%</span><span>" + format(t2) + "s</span>";
  }
});