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

    var removedelements = [];
    var removeelement;
    var what, a = arguments, L = a.length - 1, ax;
    var redblack = a[a.length - 1];
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            removeelement = this.splice(ax, 1);
            removedelements.push(removeelement[0]);
            redblack.count = redblack.count - 1;
        }
    }
    return removedelements;
};


var nodecache = function(options) {
 
  var self = this;
  self.options = _.extend({
    limit: 1000
  }, options);
 
  self.array = []


  self.redblack = redblack.tree(self.options.limit, function (deletedkeys, deletedvalues) {
    var allKeys = Object.keys(self.array);
    for(var i = 0; i < deletedvalues.length; i++) {
      delete self.array[deletedvalues[i]];
    }
  });

  self.put = function(key, value) {
    if(typeof(key) != "undefined" &&
       typeof(value) != "undefined" ) {
    
      if(typeof(self.array[key]) != "undefined" 
      && typeof(self.array[key]) !== "function" ) {
        
        var oldranking  = self.array[key].ranking;
        var oldvalue = self.redblack.getnode(oldranking).value;
        var newranking  = oldranking + 1;

        var removedelements = oldvalue.remove(key, self.redblack);

        if(oldvalue.length == 0) {
          self.redblack.delete(oldranking, true);
        }

        self.redblack.insert(newranking, key);
        self.array[key] = {ranking: newranking, value: [value]};
        
      } else {

        self.array[key] = {ranking: 1, value: [value]};
        self.redblack.insert(1, key);
      }
    }
  };

  self.get = function(key) {

    if(typeof(self.array[key]) !== "function") {
      return self.array[key];
    } else {
      return undefined;
    }
  };

};

exports.Nodecache = nodecache;
