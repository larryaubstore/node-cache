/**
 * node-cache 
 * https://github.com/larryaubstore/node-cache/ 
 *
 * Copyright 2014 Laurence Morin-Daoust
 * Released under the MIT license
 */

var _         = require('underscore');
var redblack  = require('redblack');

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length - 1, ax;
    var redblack = a[a.length];
    while (L && this.length - 1) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
            redblack.count = redblack.count - 1;
        }
    }
    return this;
};


var nodecache = function(options) {
 
  var self = this;
  self.options = _.extend({
    limit: 1000
  }, options);
 
  self.array = []


  self.redblack = redblack.tree(self.options.limit, function (deletedkeys, deletedvalues) {
    var allKeys = Object.keys(self.array);
    for(var i = 0; i < deletedkeys.length; i++) {
      delete self.array[deletedkeys[i]];
    }
  });

  self.put = function(key, value, duplicate) {
    if(typeof(key) != "undefined" &&
       typeof(value) != "undefined" ) {
    
      if(typeof(self.array[key]) != "undefined" 
      && typeof(self.array[key]) !== "function" ) {
        
        var oldvalue    = self.array[key].value;
        var oldranking  = self.array[key].ranking;
        var newranking  = oldranking + 1;

       
        if(typeof(duplicate) !== "undefined") {
          self.redblack.delete(oldranking); 
          self.redblack.insert(newranking, key);
          // value is already an array []
          self.array[key] = {ranking: newranking, value: value};
        } else {
          self.redblack.insert(oldranking, key);
          oldvalue.push(value);
          self.array[key] = {ranking: newranking, value: oldvalue};
        }

        
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
