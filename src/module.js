(function(root, def){
  'use strict';

  var
    version     = '0.0.1'
  , description = 'Moduler library'
  , license     = 'MIT'

  // If you want to bind to other namespace,
  // please change this value.
  // For example, `underxcore`, `xepto` or something.
  , namespace   = 'Module'
  ;

  // Load
  root[namespace] = def({
      'version'     : version
    , 'description' : description
    , 'license'     : license
    , 'namespace'   : namespace
  });

})(this, function($){
  'use strict';


  /*
   * Eternal extendation.
   *
   * You can make new constructor easily.
   *
   *
   * var some_mod = Module.extend({name: "sample"});
   *
   * var insane_constructor =
   *   some_mod
   *     .extend(something_1, something_2, something_3)
   *     ..... ;
   *
   */

  // Module :: a -> Constructor(a)
  //
  var Module = function(){
    // Append identifier.
    Module.count++;
    this.identifier = "Module_" + Module.count;
    (typeof this.initialize === 'function')
      && this.initialize.apply(this, arguments);
  };

  Module.extend = dilator;
  Module.count  = 0;


  // cp :: Objet -> a -> Nothing
  //
  // Destructive function. Overrides properties to dst.
  //
  function cp(dst, src, recr){
    var r;
    r = (recr === undefined) ? 1 : parseInt(recr);
    r = (r < 0) ? 0 : r;
    for(var i in src){
      var c = src[i];
      // !null && ( [object Object] || [object Array] )
      // To cut off references, clone an object for each props.
      if(c && typeof c === 'object'){
        // Make a new property.
        Object.defineProperty(dst, i, {
          value: (c.constructor) ? new (c.constructor) : {},
          configurable: true, enumerable: true, writable: true
        });
        // Prevent infinity-loop.
        r && cp(dst[i], c, r-1);
      }else{
        dst[i] = c;
      }
      c = null;
    }
  }


  // dilator :: [a...] -> Constructor
  //
  // Take variable arguments. Return a new Constructor.
  //
  function dilator( /* Arguments */ ){

    var args , p, o ;

    // Prepare parent and arguments.
    args = Array.prototype.slice.apply(arguments);
    p = this;

    // Make a new Constructor.
    var SubModule = function(){
      return p.apply(this, arguments);
    };

    // Make a surrogate.
    var Stack = function(){
      this.constructor = Module;
    }

    // Phase shifting,
    Stack.prototype  = p.prototype;
    SubModule.prototype = new Stack;
    SubModule.extend    = dilator;

    SubModule.prototype.__super__ = p.prototype;

    // Slice first argument.
    // And check it's construcable or not.
    o = args.shift();
    o = (typeof o === "function" && o.constructor) ? new o : o;

    // Do copy do.
    (function(x){
      cp(SubModule.prototype, x, 1);
    }).call(o,o);

    // More more more extensions!!
    SubModule = (args.length > 0) ? dilator.apply(SubModule, args) : SubModule;

    return SubModule;
  }


  return Module;
});
