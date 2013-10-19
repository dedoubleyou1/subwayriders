//set main namespace
goog.provide('components.enemy');

//get requirements
goog.require('lime.Sprite');

//private
var enemyTypes = {
  default: {
    hitBoxSettings: {x: 0, y: 0, width: 50, height: 50},
    triggerBoxSettings: {x: 0, y: 0, width: 100, height: 50},
    onHit: function() {
      return true;
    },
    onTrigger: function() {
      return true;
    }
  }
};

var Enemy = function() {
  this.sprite = new lime.Sprite();
  this.type = 'default';
  this.hitBox = new lime.Sprite().setFill(0, 255, 0, 0.4);
  this.triggerBox = new lime.Sprite().setFill(255, 0, 0, 0.4);
};

//public
components.enemy.EnemyOfType = function(type) {
  var thisEnemy = new Enemy();

  if (type && enemyTypes.type) {
    this.type = type;
  }
  var thisEnemyType = enemyTypes[thisEnemy.type];

  thisEnemy.hitBox.setSize(thisEnemyType.hitBoxSettings.width, thisEnemyType.hitBoxSettings.height);
  thisEnemy.triggerBox.setSize(thisEnemyType.triggerBoxSettings.width, thisEnemyType.triggerBoxSettings.height);

  thisEnemy.prototype.onHit = enemyTypes[thisEnemy.type].onHit;
  thisEnemy.prototype.onTrigger = enemyTypes[thisEnemy.type].onTrigger;

  return thisEnemy;
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('components.enemy.EnemyOfType', components.enemy.EnemyOfType);
