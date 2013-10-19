//set main namespace
goog.provide('components.player');

//get requirements
goog.require('lime.Sprite');

//private

//public
components.players.Player = function(type) {
  this.sprite = new lime.Sprite().setSize(100, 400).setFill(0, 0, 255, 0.4);
  this.type = 'default';
  this.hitBox = new lime.Sprite().setSize(100, 50).setFill(255, 0, 0, 0.4);
  this.onHit = function() {
      return true;
  };
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('components.players.Player', components.players.Player);
