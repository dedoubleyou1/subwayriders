//set main namespace
goog.provide('levels.level');

//get requirements
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('settings');

// public
levels.level.load = function(levelNumber) {
  thisLevel = {
    scene: new lime.Scene(),
    levelNumber: levelNumber,
    subwayCar: new lime.Layer().setFill('assets/subway_car.png');
    start: function() {

    }
  };
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('levels.level.load', levels.level.load);