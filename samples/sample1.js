console.log("---------- Sample 1 --------------------------------------");

var ex = Module.extend({
  name: "base",
  desc: "this is base object."
});

var q = new ex;
var r = new ex;

// Change something.
q.name = 4;

console.log("Q: ", q);
console.log("R: ", r);

