//set main namespace
goog.provide('settings');

settings = {
  levels: [
    {
      enemies: [
        {type: 'default', location: {x: 500, y: 0}},
        {type: 'default', location: {x: 1000, y: 150}},
        {type: 'default', location: {x: 1500, y: 100}}
      ]
    }
  ]
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('settings', settings);
