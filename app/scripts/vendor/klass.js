function Klass(options){
  function konstructor(){
    if (this.init){
      this.init.apply(this, arguments);
    }
  }

  for (var all in options){
    konstructor.prototype[all] = options[all];
  }

  return konstructor;
}