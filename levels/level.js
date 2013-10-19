//set main namespace
goog.provide('levels.level');

//get requirements
goog.require('components.Enemy');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('settings');

// public
levels.level = function(levelNumber) {
  thisLevel = {
    scene: new lime.Scene(),
    levelNumber: levelNumber,
    subwayCar: new lime.Layer(),
    subwayCarFloor: new lime.Layer().setSize(3625, 384).setPosition(0, 384),
    subwayCarSprite: new lime.Sprite().setFill('assets/subway_car.png').setAnchorPoint(0, 0).setPosition(0, 0),
    enemies: [],
    start: function() {
    }
  };

  thisLevel.scene.appendChild(thisLevel.subwayCar);
  thisLevel.subwayCar.appendChild(thisLevel.subwayCarSprite);
  thisLevel.subwayCar.appendChild(thisLevel.subwayCarFloor);

  settings.levels[levelNumber].enemies.forEach(function(element, index, array) {
    var newEnemy = new components.Enemy(element.type);
    thisLevel.enemies.push(newEnemy);
    thisLevel.subwayCarFloor.appendChild(newEnemy.layer);
    newEnemy.layer.setPosition(element.location.x, element.location.y);
    console.log('Enemy Produced', newEnemy);
  });

  return thisLevel;
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('levels.level', levels.level);
