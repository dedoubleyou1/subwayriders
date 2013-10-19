//set main namespace
goog.provide('components.Player');

//get requirements
goog.require('lime.Layer');
goog.require('lime.Sprite');

//private

//public
components.Player = function(type) {
  this.spriteGroup = new lime.Layer().setAnchorPoint(0, 0).setSize(100, 50);
  this.sprite = new lime.Sprite().setSize(120, 390).setFill('assets/GIRL_MAIN_character_walking02.png').setAnchorPoint(0.5, 1);
  this.hitBox = new lime.Sprite().setSize(100, 50).setFill(255, 0, 0, 0.4).setAnchorPoint(0.5, 1);

  this.spriteGroup.appendChild(this.sprite);
  this.spriteGroup.appendChild(this.hitBox);
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('components.Player', components.Player);
