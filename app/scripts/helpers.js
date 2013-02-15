function distance(positionA, positionB){

  if (!positionA || !positionB){ return 0; }

  return Math.sqrt(
    Math.pow(positionA.x - positionB.x, 2) + 
    Math.pow(positionA.y - positionB.y, 2) + 
    Math.pow(positionA.z - positionB.z, 2)
  );
}

function speed (distance, time) {
  return (distance / 1000) / (time / 1e12);
}