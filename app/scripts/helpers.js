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