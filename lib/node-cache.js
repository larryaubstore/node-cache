/**
 * node-cache 
 * https://github.com/larryaubstore/node-cache/ 
 *
 * Copyright 2014 Laurence Morin-Daoust
 * Released under the MIT license
 */

var _         = require('underscore');
var redblack  = require('redblack');

var nodecache = function(options) {
 
  var self = this;
  self.options = _.extend({
    limit: 1000
  }, options);
 
  self.array = []


  self.redblack = redblack.tree(self.options.limit, function (deletedelements) {
    var allKeys = Object.keys(self.array);
    for(var i = 0; i < deletedelements.length; i++) {
      delete self.array[deletedelements[i]];
    }
  });

  self.put = function(key, value) {

    if(typeof(key) != "undefined" &&
       typeof(value) != "undefined" ) {
    
      if(typeof(self.array[key]) != "undefined" 
      && typeof(self.array[key]) !== "function" ) {
        var oldvalue = self.array[key];
        self.redblack.delete(oldvalue.ranking, key);

        oldvalue.ranking = oldvalue.ranking + 1;
        oldvalue.value.push(value);
        self.array[key] = oldvalue;
        self.redblack.insert(oldvalue.ranking, key);
        
      } else {

        self.array[key] = {ranking: 1, value: [value]};
        self.redblack.insert(1, key);
      }
    }
  };

  self.get = function(key) {
    return self.array[key];
  };

};

exports.Nodecache = nodecache;
