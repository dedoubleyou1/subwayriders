//set main namespace
goog.provide('subwayriders');


//get requirements
goog.require('levels.level');
goog.require('lime.Director');

// entrypoint
subwayriders.start = function() {

  var director = new lime.Director(document.body, 1024, 768);
  var level1 = levels.level(0);

  // set current scene active
  director.replaceScene(level1.scene);
  level1.start();

};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('subwayriders.start', subwayriders.start);
