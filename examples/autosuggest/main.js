var nodecrawler = require('node-crawler');
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



var level1 = new nodecache.Nodecache({ limit: 256 });

// 2 words combination
var level2 = new nodecache.Nodecache({ limit: 256 });

// 4 words combination
var level3 = new nodecache.Nodecache({ limit: 256 });

// 8 words combination
var level4 = new nodecache.Nodecache({ limit: 256 });


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

var put = function (value1, value2, value3, value4, value5, value6, value7, value8, words) {


  var value = " ";

  var key000 = (value1) + " " + (value2);
  var key001 = (value3) + " " + (value4);
  var key010 = (value5) + " " + (value6);
  var key011 = (value7) + " " + (value8);

  
  var key00 = (key000) + " " + (key001);
  var key01 = (key010) + " " + (key011);

  var key0 = (key00) + " " + (key01);


  console.log(key000);
  console.log(words);
  console.log("\n");
  level1.put(key000, words);
  level1.put(key001, words);
  level1.put(key010, words);
  level1.put(key011, words);

  level2.put(key00, words);
  level2.put(key01, words);

  level3.put(key0, words);


  //putlevel0(value1, value2, value3, value4, value5, value6, value7, value8);
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
        var begin;
        var count = 0;

        for(var i = 0; i < words.length - 8; i++) {

          count = count + words[i].length + 1;
          
          begin = '', end = '';
          if(count >= 10) {
            begin = count - 10;
          } else {
            begin = 0;
          }

          put(words[i], words[i+1], words[i+2], words[i+3], words[i+4], words[i+5], words[i+6], words[i+7], words[i+8], html.substr(begin, 20));
        }
      }
    }
  });

  crawler.queue("http://www.gutenberg.org/cache/epub/16066/pg16066.txt");
