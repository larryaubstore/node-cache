var nodecrawler = require('nodecrawler');
var nodecache = require('../../lib/node-cache');
var cheerio = require('cheerio');

//var sha256 = function (pwd) {
//  var hash;
//  var shasum = crypto.createHash('sha256');
//  shasum.update(pwd, "utf8");
//  hash = shasum.digest("hex");
//  return hash;
//};

var $, html, words;

var sha256 = function(pwd) {
  return pwd;
};

var level0_1 = new nodecache.Nodecache({ maxsize: 26 });
var level0_2 = new nodecache.Nodecache({ maxsize: 26 });
var level0_3 = new nodecache.Nodecache({ maxsize: 26 });


var level1 = new nodecache.Nodecache({ maxsize: 256 });

// 2 words combination
var level2 = new nodecache.Nodecache({ maxsize: 256 });

// 4 words combination
var level3 = new nodecache.Nodecache({ maxsize: 1024 });

// 8 words combination
var level4 = new nodecache.Nodecache({ maxsize: 64 });


var chopsingleword = function(word) {
  var result = [];
  while(word.length > 2) {
    result.push(word.substr(0, 2));
    word = word.substr(2);
  }

  if(word.length > 0) {
    result.push(word);
  }
};

var putlevel0 = function(value1, value2, value3, value4, value5, value6, value7, value8) {


  
};

// MERKLE TREE
var put = function (value1, value2, value3, value4, value5, value6, value7, value8) {

//  var key000 = sha256(sha256(value1) + " " + sha256(value2));
//  var key001 = sha256(sha256(value3) + " " + sha256(value4));
//  var key010 = sha256(sha256(value5) + " " + sha256(value6));
//  var key011 = sha256(sha256(value7) + " " + sha256(value8));
//
//  
//  var key00 = sha256(sha256(key000) + " " + sha256(key001));
//  var key01 = sha256(sha256(key010) + " " + sha256(key011));
//
//  var key0 = sha256(sha256(key00) + " " + sha256(key01));

  var value = " ";

  var key000 = (value1) + " " + (value2);
  var key001 = (value3) + " " + (value4);
  var key010 = (value5) + " " + (value6);
  var key011 = (value7) + " " + (value8);

  
  var key00 = (key000) + " " + (key001);
  var key01 = (key010) + " " + (key011);

  var key0 = (key00) + " " + (key01));

  level1.put(value000, value);
  level1.put(value001, value);
  level1.put(value010, value);
  level1.put(value011, value);

  level2.put(key00, value);
  level2.put(key01, value);

  level3.put(key0, value);

  putlevel0(value1, value2, value3, value4, value5, value6, value7, value8);
};


var crawler = new nodecrawler.Crawler({ 
    loadstatic:     true,
    loadstaticDirectory: "tmp/",
    checkrobotsTXT: true,
    "callback":function(error,result,ignore) {
      if(result && result.body && result.body.length > 0) { 

        $ = cheerio.load(result.body);
        html = $.html();

        words = html.split(/\s/g);

        for(var i = 0; i < words.length - 8; i++) {

        }
        
        
        
      }
    }
  });

  crawler.queue("http://www.gutenberg.org/cache/epub/16066/pg16066.txt");
