console.log("---------- Sample 2 --------------------------------------");

// Normal constructor.

var Living = Module.extend({
  initialize: function(o){
    this.name = (o && o.hasOwnProperty('name')) ? o.name : "noname";
  }
});

var Dog = Living.extend({
  fur: "normal",
  leg: 4
});

var Shiba = Dog.extend({
  fur: "short"
});

var Mame = new Shiba({
  name: "MameShiba"
});

console.log(Mame);
console.log("Mame's leg count: ", Mame.leg);
console.log("Mame's fur length: ", Mame.fur)


var Bug = Living.extend({
  eye: 2,
  leg: 6,
  size: "normal",
  color: "red"
});

var Tonbo = Bug.extend({
  wing: 4
});

var Oniyanma = Tonbo.extend({
  size: "BIG"
});

var Akatonbo = Tonbo.extend({
  size: "small"
});

var Tom = new Oniyanma;
console.log(Tom);


var Trait_GreetWhenBorn = {
  // initialize() is an only availble hook for Module constructor.
  initialize: function(o){
    console.log(this.identifier + ", " + this.name + " said '"+o+"'");
  }
};

var PoliteDog = Module.extend(Dog, Trait_GreetWhenBorn);

var BigDog = PoliteDog.extend({
  name: "Brutus"
});

var Brutus = new BigDog("Grrr...");
