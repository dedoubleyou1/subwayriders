//set main namespace
goog.provide('settings');

settings = {
  levels: [
    {
      enemies: [
        {type: 'default', location {x: 100, y: 100}},
        {type: 'default', location {x: 200, y: 150}},
        {type: 'default', location {x: 300, y: 50}}
      ]
    }
  ]
};

//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('settings', settings);
