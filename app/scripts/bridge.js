if (typeof GLOBAL == "undefined"){
  GLOBAL = window;
  GLOBAL.IS_BROWSER = true;
} else {
  GLOBAL.IS_BROWSER = false;

  GLOBAL.requestAnimationFrame = function(callback){
    process.process.nextTick(callback);
  };
}