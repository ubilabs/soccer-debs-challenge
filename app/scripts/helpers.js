GLOBAL.$ = function(id){

  if (!IS_BROWSER){ return; }

  return document.getElementById(id);
};

GLOBAL.computeDistance = function(positionA, positionB){

  if (!positionA || !positionB){ return 0; }

  return Math.sqrt(
    Math.pow(positionA.x - positionB.x, 2) +
    Math.pow(positionA.y - positionB.y, 2) +
    Math.pow(positionA.z - positionB.z, 2)
  );
};

GLOBAL.computeSpeed = function(distance, time) {
  return (distance / 1000 / 1000) / (time / 1e12 / 60 / 60);
};

GLOBAL.format = function(time){
  return Math.round(time / 1e12);
};

GLOBAL.goalTarget = function(p1, p2){
  var min = p1.y > p2.y ? MINY : -MINY,
    ratio = (p1.y - min) / (p1.y - p2.y),
    y = p1.y + (p2.y - p1.y) * ratio,
    x = p1.x + (p2.x - p1.x) * ratio,
    z = p1.z + (p2.z - p1.z) * ratio,
    hit;

  z = Math.max(z, 0);

  hit = ratio < 1 &&
    ratio >= 0 &&
    x > GOAL_XMIN &&
    x < GOAL_XMAX &&
    z < GOAL_Z;

  return {
    x: x,
    y: y,
    z: z,
    hit: hit,
    ratio: ratio,
    p1: p1,
    p2: p2
  };

};