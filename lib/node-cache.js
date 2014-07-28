var _ = require('underscore');

var nodecache = function(options) {


  
  var self = this;
  self.array = [];
  self.status = {};
  self.status.memorysize = 0;
  self.status.count = 0;
  self.status.average =  0;


  //Default options
  self.options = _.extend({
    maxsize: 1024 * 1024 * 100, // 100MB
    firstbucketlimit: 2,
    secondbucketlimit: 5,
    thirdbucketlimit: 10,
    fourthbucketlimit: 100,
  },options);

  self.getsize = function(element, key) {
    var size = 0;
    if( typeof(element) != "undefined" &&
        typeof(element.value) != "undefined" &&
        typeof(element.ranking) != "undefined") {
      size = element.value.length + key.length + 1;
    }
    return size;
  };

  self.cleaningratio = function() {

    var capacitypercentage = parseInt((self.status.memorysize / self.options.maxsize) * 100);
    var ratio = 0;

    // 0 - 10000
    if(capacitypercentage <= 30) {
      ratio = 0;
    } else if(capacitypercentage <= 50 ) {
      ratio = 1;
    } else if(capacitypercentage <= 60 ) {
      ratio = 1;
    } else if(capacitypercentage <= 70 ) {
      ratio = 10;
    } else if(capacitypercentage <= 75 ) {
      ratio = 20;
    } else if(capacitypercentage <= 80 ) {
      ratio = 30;
    } else if(capacitypercentage <= 85 ) {
      ratio = 50;
    } else if(capacitypercentage <= 87 ) {
      // 1%
      ratio = 100;
    } else if(capacitypercentage <= 90 ) {
      // 2%
      ratio = 200;
    } else if(capacitypercentage <= 92 ) {
      // 5%
      ratio = 500;
    } else if(capacitypercentage <= 95 ) {
      // 10%
      ratio = 1000;
    } else {
      // 30 %
      ratio = 3000;
    }
    return ratio;
  };

  self.cleanarray = function(cleaningratio) {
    var numberOfElements = parseInt( (cleaningratio / 10000) * self.status.count );
    var element;
    for(var i = 0; i < numberOfElements; i++) {
      element = self.array[i];
      if(element.ranking < average) {
        self.array.splice(i, 1);
        numberOfElements = numberOfElements - 1;
      }
    }
  };


  self.put = function(ranking, key, value) {

    if(typeof(key) != "undefined" &&
       typeof(value) != "undefined" &&
       typeof(ranking) != "undefined") {
    
      var elementsize = self.getsize({ranking: ranking, value: value}, key); 

      // check if we exceed the limit
      if(self.status.memorysize + elementsize  >= self.options.maxsize) {
        // 50% cleaning ratio
        self.cleanarray(5000);
        self.put(ranking, key, value);
      } else {
        var cleaningratio = self.cleaningratio();
        self.cleanarray(cleaningratio);
      }

      if(typeof(self.array[key]) !== "undefined") {
        var oldElementSize = self.getsize(self.array[key], key);
        self.status.memorysize = self.status.memorysize - oldElementSize + elementsize;
      } else {
        self.status.memorysize = self.status.memorysize + elementsize;
      }
      self.status.count = self.status.count + 1; 
      self.array[key] = { ranking: ranking, value: value };
    }
  };

  self.get = function(key) {
    return self.array[key];
  };

};

exports.Nodecache = nodecache;