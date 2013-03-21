Player = Klass({
  init: function(name){
    this.legs = [];
    this.possesionTime = 0;
    this.name = name;
    var team1 = MAPPING.TEAM1.indexOf(PLAYERS[name][0]) > -1;
    this.team = team1 ? TYPES.TEAM1 : TYPES.TEAM2;

    this.$li = document.createElement("li");
    this.$time = document.createElement("span");
    this.$name = document.createElement("span");

    this.$name.innerHTML = name.split(" ")[1];
    this.$time.innerHTML = "000";

    $(this.team).appendChild(this.$li);
    this.$li.appendChild(this.$time);
    this.$li.appendChild(this.$name);
  },

  addLeg: function(leg){
    this.legs.push(leg);
  },

  render: function(time){

    time = Math.round((this.possesionTime + time) / 1e12);
    time = (1e6+time+"").slice(-3);
    this.$time.innerHTML = time;
  },

  downlight: function(){
    this.$li.style.opacity = "";
  },

  highlight: function(){
    this.$li.style.opacity = 1;
  }
});