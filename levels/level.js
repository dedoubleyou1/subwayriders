//set main namespace
goog.provide('levels.Level');

//get requirements
goog.require('components.Enemy');
goog.require('components.Player');
goog.require('components.Enemy');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.MoveTo');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('settings');

// public
levels.Level = function(levelNumber) {
  var that = this;
  this.scene = new lime.Scene();
  this.levelNumber = levelNumber;
  this.subwayCar = new lime.Layer().setAnchorPoint(0, 0).setPosition(362, 0);
  this.subwayCarFloor = new lime.Sprite().setSize(3625, 350).setPosition(0, 400).setAnchorPoint(0, 0);
  this.subwayCarSprite = new lime.Sprite().setFill('assets/subway_car.png').setAnchorPoint(0, 0).setPosition(0, 0);
  this.character = new components.Player();
  this.character.spriteGroup.setPosition(150, 200);
  this.enemies = [];

  this.scene.appendChild(this.subwayCar);
  this.subwayCar.appendChild(this.subwayCarSprite);
  this.subwayCar.appendChild(this.subwayCarFloor);
  this.subwayCarFloor.appendChild(this.character.spriteGroup);


  settings.levels[levelNumber].enemies.forEach(function(element, index, array) {
    var newEnemy = new components.Enemy(element.type);
    that.enemies.push(newEnemy);
    that.subwayCarFloor.appendChild(newEnemy.spriteGroup);
    newEnemy.spriteGroup.setPosition(element.location.x, element.location.y);
    console.log('Enemy Produced', newEnemy);
  });

  // when called starts round
  this.start = function() {
    console.log('test');
    goog.events.listen(this.subwayCarFloor, ['mousedown', 'touchstart'], function(e) {
      console.log('hit');
      that.character.spriteGroup.runAction(
        new lime.animation
          .MoveTo(e.position.x, e.position.y)
          .setSpeed(1)
          .setEasing(lime.animation.Easing.LINEAR)
      );
      that.subwayCar.runAction(
        new lime.animation
          .MoveBy(that.character.spriteGroup.getPosition().x - e.position.x, 0)
          .setSpeed(1)
          .setEasing(lime.animation.Easing.LINEAR)
      );
    });
  };
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('levels.Level', levels.Level);
