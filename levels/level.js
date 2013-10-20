//set main namespace
goog.provide('levels.Level');

//get requirements
goog.require('components.Enemy');
goog.require('components.Player');
goog.require('lime.animation.KeyframeAnimation');
goog.require('lime.animation.MoveBy');
goog.require('lime.animation.MoveTo');
goog.require('lime.animation.RotateTo');
goog.require('lime.Layer');
goog.require('lime.Scene');
goog.require('lime.Sprite');
goog.require('settings');

//private

function convertBoxToParent(element) {
  var boundingBox = element.getBoundingBox();
  var parentCoord = element.getParent().getPosition();
  boundingBox.top = boundingBox.top + parentCoord.y;
  boundingBox.bottom = boundingBox.bottom + parentCoord.y;
  boundingBox.left = boundingBox.left + parentCoord.x;
  boundingBox.right = boundingBox.right + parentCoord.x;
  return boundingBox;
}

function getChildren(parentGroup) {
  var numChildren = parentGroup.getNumberOfChildren();
  var childArray = [];
  for (var i = 0; i < numChildren; i++) {
    childArray.push(parentGroup.getChildAt(i));
  }
  return childArray;
}

var attackTypes = {
  stun: function(character, enemy) {
    character.status = 'stunned';
    var moveDistanceX = (character.spriteGroup.getPosition().x - enemy.spriteGroup.getPosition().x) / 2;
    var moveDistanceY = (character.spriteGroup.getPosition().y - enemy.spriteGroup.getPosition().y) / 2;
    attackAnimation = new lime.animation
      .MoveBy(moveDistanceX, moveDistanceY)
      .setSpeed(1)
      .setEasing(lime.animation.Easing.EASEOUT);
    character.spriteGroup.runAction(attackAnimation);
    goog.events.listen(attackAnimation, lime.animation.Event.STOP, function() {
      character.status = 'active';
    });
  },
  knockdown: function(character, enemy) {
    character.status = 'stunned';
    var moveDistanceX = (character.spriteGroup.getPosition().x - enemy.spriteGroup.getPosition().x);
    var moveDistanceY = (character.spriteGroup.getPosition().y - enemy.spriteGroup.getPosition().y);
    attackAnimation = new lime.animation
      .MoveBy(moveDistanceX, moveDistanceY)
      .setSpeed(1)
      .setEasing(lime.animation.Easing.EASEOUT);
    character.spriteGroup.runAction(attackAnimation);
    goog.events.listen(attackAnimation, lime.animation.Event.STOP, function() {
      character.status = 'active';
    });
  },
  fall: function(character, enemy) {
    character.status = 'stunned';
    var fallAnimation = new lime.animation.KeyframeAnimation()
      .addFrame('assets/character-01.png')
      .addFrame('assets/character-03.png')
      .addFrame('assets/character-04.png')
      .addFrame('assets/character-03.png')
      .addFrame('assets/character-01.png');
  }
};

// public
levels.Level = function(levelNumber) {
  var that = this;
  this.scene = new lime.Scene();
  this.levelNumber = levelNumber;
  this.subwayCar = new lime.Sprite().setFill('assets/subway_car.png').setSize(3625, 768).setPosition(362, 384).setAnchorPoint(0.211, 0.5);
  this.subwayCarFloor = new lime.Sprite().setSize(3625, 350).setPosition(0, 16).setAnchorPoint(0, 0);
  this.character = new components.Player();
  this.character.spriteGroup.setPosition(384, 200);
  this.enemies = [];

  this.subwayCarFloor.appendChild(this.character.spriteGroup);
  this.subwayCar.appendChild(this.subwayCarFloor);
  this.scene.appendChild(this.subwayCar);


  settings.levels[levelNumber].enemies.forEach(function(element, index, array) {
    var newEnemy = new components.Enemy(element.type);
    that.enemies.push(newEnemy);
    that.subwayCarFloor.appendChild(newEnemy.spriteGroup);
    newEnemy.spriteGroup.setPosition(element.location.x, element.location.y);
    that.subwayCarFloor.setChildIndex(newEnemy.spriteGroup, element.location.y);
  });

  // when called starts round
  this.characterMoveAnimation = {};
  this.start = function() {
    var subwayRocking = function() {
      subwayAnimation = new lime.animation.RotateTo(Math.random() * 10 - 5).setDuration(1);
      that.subwayCar.runAction(subwayAnimation);
      goog.events.listen(subwayAnimation, lime.animation.Event.STOP, function() {
        subwayRocking();
      });
    };
    subwayRocking();

    window.addEventListener('deviceorientation', function(event) {
      var tempAlpha = event.alpha;
      console.log(tempAlpha);
      if (tempAlpha > 45 && tempAlpha < 180) {
        tempAlpha = 45;
      } else if (tempAlpha > 180 && tempAlpha < 315) {
        tempAlpha = 315;
      }
      that.character.sprite.setRotation(-tempAlpha);
      attackTypes.fall(that.subwayCar, that.character);
    });

    goog.events.listen(this.subwayCarFloor, ['mousedown', 'touchstart'], function(e) {
      if (that.character.status = 'active') {
        that.characterMoveAnimation.character = new lime.animation
          .MoveTo(e.position.x, e.position.y)
          .setSpeed(1)
          .setEasing(lime.animation.Easing.LINEAR);
        that.character.spriteGroup.runAction(
          that.characterMoveAnimation.character
        );
      }
    });

    lime.scheduleManager.schedule(function(dt) {

      //keep screen in center
      that.subwayCar.setAnchorPoint(that.character.spriteGroup.getPosition().x / 3625, 0.5);
      that.subwayCarFloor.setPosition(-that.character.spriteGroup.getPosition().x, 0.5);

      // Sets Z-index for objects
      var childArray = (getChildren(that.subwayCarFloor)).sort(function(a, b) {
        return a.getPosition().y - b.getPosition().y;
      });

      childArray.forEach(function(element, index, array) {
        that.subwayCarFloor.setChildIndex(element, index);
      });

      that.enemies.forEach(function(element, index, array) {
        if (goog.math.Box.intersects(
          convertBoxToParent(element.hitBox),
          convertBoxToParent(that.character.hitBox)
        )) {
          that.characterMoveAnimation.character.stop();
          var collisionResults = element.onHit();
          attackTypes.stun(that.character, element);
        }
      });
    });
  };
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('levels.Level', levels.Level);
