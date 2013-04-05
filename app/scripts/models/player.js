Player = Klass({

  init: function(name){
    this.sensors = [];
    this.possesionTime = 0;
    this.hitCount = 0;
    this.active = false;
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

  addSensor: function(leg){
    this.sensors.push(leg);
  },

  render: function(time){

    if (this.active){
      this.possesionTime += time - this.time;
      this.time = time;
    }

    var possesion = this.possesionTime;
    possesion = Math.round(possesion / 1e12);
    possesion = (1e10 + "" + possesion).slice(-4);

    this.$time.innerHTML = possesion + " : " + this.hitCount;
    this.$li.style.opacity = this.active ? 1 : "";
  },

  select: function(active, time){

    if (active){

      if (!this.active){
        this.time = time;
        this.hitCount++;
      }

    } else {
      this.possesionTime += time - this.time;
    }

    this.active = active;

  }
});