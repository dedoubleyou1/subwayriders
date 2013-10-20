//set main namespace
goog.provide('settings');

settings = {
  levels: [
    {
      enemies: [
        {type: 'pole', location: {x: 500, y: 150}},
        {type: 'pole', location: {x: 1000, y: 150}},
        {type: 'pole', location: {x: 1500, y: 150}},
        {type: 'pole', location: {x: 2000, y: 150}},
        {type: 'pole', location: {x: 2500, y: 150}},
        {type: 'pole', location: {x: 3000, y: 150}},
        {type: 'person1', location: {x: 200, y: 100}},
        {type: 'person2', location: {x: 2220, y: 150}},
        {type: 'person1', location: {x: 3100, y: 250}},
        {type: 'person2', location: {x: 400, y: 120}},
        {type: 'person2', location: {x: 1220, y: 350}},
        {type: 'person1', location: {x: 700, y: 250}},
        {type: 'person2', location: {x: 1600, y: 100}},
        {type: 'person1', location: {x: 2200, y: 150}},
        {type: 'person2', location: {x: 3100, y: 250}},
        {type: 'person1', location: {x: 2720, y: 350}},
        {type: 'person2', location: {x: 1700, y: 250}},
        {type: 'person2', location: {x: 3220, y: 150}},
        {type: 'person1', location: {x: 3900, y: 250}},
        {type: 'band', location: {x: 2520, y: 150}},
        {type: 'band', location: {x: 3600, y: 250}}
      ]
    }
  ]
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('settings', settings);
