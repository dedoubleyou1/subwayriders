//set main namespace
goog.provide('subwayriders');


//get requirements
goog.require('lime.Director');
goog.require('lime.Scene');


// entrypoint
subwayriders.start = function() {

  var director = new lime.Director(document.body, 1024, 768);
  var scene = new lime.Scene();


  // set current scene active
  director.replaceScene(scene);

};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('subwayriders.start', subwayriders.start);
