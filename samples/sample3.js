console.log("---------- Sample 3 --------------------------------------");

var Chain = Module.extend({
  initialize: function(o){
    (this.__super__ && this.__super__.initialize)
      && this.__super__.initialize((this.chain ? this.chain(o) : o ));
  }
});

var chain1 = Chain.extend({
  chain: function(o){
    this.name = "Foo";

    var new_message = o + "["+this.name+" -> 1]";
    this.memory = new_message;
    return new_message;
  }
});

var chain2 = chain1.extend({
  chain: function(o){
    this.name = "Bar";

    var new_message = o + "["+this.name+" -> 2]";
    this.message = new_message;
    return new_message;
  }
});

var chained = new chain2("chaining");

console.log(chained.memory);
