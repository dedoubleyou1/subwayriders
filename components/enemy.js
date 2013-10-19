//set main namespace
goog.provide('components.Enemy');

//get requirements
goog.require('lime.Layer');
goog.require('lime.Sprite');

//private
var enemyTypes = {
  default: {
    size: {width: 40, height: 40},
    hitBox: {x: 0, y: 0, width: 50, height: 50},
    triggerBox: {x: 0, y: 0, width: 100, height: 50},
    onHit: function() {
      return true;
    },
    onTrigger: function() {
      return true;
    }
  }
};

var Enemy = function() {
  this.layer = new lime.Layer();
  this.sprite = new lime.Sprite().setFill(0, 0, 0, 0.4);
  this.type = 'default';
  this.hitBox = new lime.Sprite().setFill(0, 255, 0, 0.4);
  this.triggerBox = new lime.Sprite().setFill(255, 0, 0, 0.4);
};

//public
components.Enemy = function(type) {
  var thisEnemy = new Enemy();

  if (type && enemyTypes.type) {
    thisEnemy.type = type;
  }
  var thisEnemyType = enemyTypes[thisEnemy.type];

  thisEnemy.layer.appendChild(thisEnemy.sprite);
  thisEnemy.layer.appendChild(thisEnemy.hitBox);
  thisEnemy.layer.appendChild(thisEnemy.triggerBox);

  thisEnemy.sprite.setSize(thisEnemyType.size.width, thisEnemyType.size.height);
  thisEnemy.hitBox.setSize(thisEnemyType.hitBox.width, thisEnemyType.hitBox.height);
  thisEnemy.triggerBox.setSize(thisEnemyType.triggerBox.width, thisEnemyType.triggerBox.height);

  thisEnemy.onHit = enemyTypes[thisEnemy.type].onHit;
  thisEnemy.onTrigger = enemyTypes[thisEnemy.type].onTrigger;

  return thisEnemy;
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('components.Enemy', components.Enemy);
