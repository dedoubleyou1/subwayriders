//set main namespace
goog.provide('components.Enemy');

//get requirements
goog.require('lime.Layer');
goog.require('lime.Sprite');

//private
var enemyTypes = {
  basic: {
    image: '',
    size: {width: 40, height: 40},
    hitBox: {x: 0, y: 0, width: 50, height: 50},
    triggerBox: {x: 0, y: 0, width: 100, height: 50},
    triggerBoxActive: true,
    onHit: function() {
      return {
        indignity: 10,
        action: 'stun'
      };
    },
    onTrigger: function() {
      return true;
    }
  },
  pole: {
    image: 'assets/subway_pole.png',
    size: {width: 43, height: 552},
    hitBox: {x: 0, y: 0, width: 45, height: 30},
    triggerBox: {x: 0, y: 0, width: 100, height: 50},
    triggerBoxActive: true,
    onHit: function() {
      return {
        indignity: 10,
        action: 'stun'
      };
    },
    onTrigger: function() {
      return true;
    }
  },
  person1: {
    image: 'assets/person1.png',
    size: {width: 106, height: 324},
    hitBox: {x: 0, y: 0, width: 100, height: 30},
    triggerBox: {x: 0, y: 0, width: 100, height: 50},
    triggerBoxActive: true,
    onHit: function() {
      return {
        indignity: 10,
        action: 'knockdown'
      };
    },
    onTrigger: function() {
      return true;
    }
  },
  person2: {
    image: 'assets/person2.png',
    size: {width: 118, height: 384},
    hitBox: {x: 0, y: 0, width: 130, height: 30},
    triggerBox: {x: 0, y: 0, width: 100, height: 100},
    triggerBoxActive: true,
    onHit: function() {
      return {
        indignity: 10,
        action: 'knockdown'
      };
    },
    onTrigger: function() {
      return true;
    }
  },
  band: {
    image: 'assets/band.png',
    size: {width: 310, height: 355},
    hitBox: {x: 0, y: 0, width: 250, height: 100},
    triggerBox: {x: 0, y: 0, width: 100, height: 50},
    triggerBoxActive: true,
    onHit: function() {
      return {
        indignity: 10,
        action: 'knockdown'
      };
    },
    onTrigger: function() {
      return true;
    }
  }
};

//public
components.Enemy = function(type) {
  if (type !== null) {
    this.type = type;
  } else {
    this.type = 'basic';
  }

  var thisType = enemyTypes[this.type];

  this.sprite = new lime.Sprite()
    .setFill(thisType.image)
    .setAnchorPoint(0.5, 1)
    .setSize(thisType.size.width, thisType.size.height);

  this.hitBox = new lime.Sprite()
    .setFill(0, 255, 0, 0.4)
    .setAnchorPoint(0.5, 1)
    .setSize(thisType.hitBox.width, thisType.hitBox.height);

  this.triggerBox = new lime.Sprite()
    .setFill(255, 0, 0, 0.4)
    .setAnchorPoint(0.5, 0.5)
    .setSize(thisType.triggerBox.width, thisType.triggerBox.height);

  this.spriteGroup = new lime.Layer()
    .setAnchorPoint(0, 0)
    .setSize(thisType.size.width, thisType.size.height)
    .appendChild(this.sprite)
    .appendChild(this.hitBox)
    .appendChild(this.triggerBox);

  this.onHit = enemyTypes[this.type].onHit;
  this.onTrigger = enemyTypes[this.type].onTrigger;
  this.triggerBoxActive = thisType.triggerBoxActive;
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('components.Enemy', components.Enemy);
