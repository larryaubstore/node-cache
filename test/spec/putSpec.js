var nodecache = require('../../lib/node-cache');
var fs        = require('fs');


describe("Put key/value/ranking tests", function () {

  it("Add a key", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache.redblack, "insert").andCallThrough();


    cache.put("key", "keyvalue");

    var element = cache.get("key");

    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["keyvalue"]);

    expect(cache.redblack.insert).toHaveBeenCalled();
    expect(cache.redblack.insert.calls[0].args[0]).toEqual(1);
    expect(cache.redblack.insert.calls[0].args[1]).toEqual("key");

  });

  it("Add a key two times", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache.redblack, "insert").andCallThrough();
    spyOn(cache.redblack, "delete").andCallThrough();

    cache.put("key", "keyvalue");

    var element = cache.get("key");

    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["keyvalue"]);

    expect(cache.redblack.insert).toHaveBeenCalled();
    expect(cache.redblack.insert.calls[0].args[0]).toEqual(1);
    expect(cache.redblack.insert.calls[0].args[1]).toEqual("key");
    expect(cache.redblack.delete).not.toHaveBeenCalled();

    cache.put("key", "keyvalue");
    expect(cache.redblack.delete).toHaveBeenCalled();
    expect(cache.redblack.insert.calls.length).toEqual(2);
    expect(cache.redblack.getnode(2)).toBeDefined();
  });

  it("test cache limit", function () {

    var cache  = new nodecache.Nodecache({limit: 6});

    expect(cache.redblack.limit).toEqual(6);

    spyOn(cache.redblack, "insert").andCallThrough();
    spyOn(cache.redblack, "delete").andCallThrough();

   
    cache.put("key", "keyvalue");
    cache.put("key", "keyvalue");
    expect(cache.redblack.count).toEqual(2);
    expect(cache.redblack.root.key).toEqual(1);
    expect(cache.redblack.root.value).toEqual(["key", "key"]);
  

    expect(Object.keys(cache.array).length).toEqual(1);
    expect(cache.get("key").value).toEqual(["keyvalue", "keyvalue"]);

    cache.put("key1", "one");
    expect(cache.redblack.count).toEqual(3);

    cache.put("key2", "two");
    expect(cache.redblack.count).toEqual(4);

    cache.put("key3", "three");
    expect(cache.redblack.count).toEqual(5);


    var element = cache.get("key");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(2);
    expect(element.value).toEqual(["keyvalue", "keyvalue"]);
    expect(cache.redblack.count).toEqual(5);

    element = cache.get("key2");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["two"]);

    

    debugger;
    cache.put("key4", "four");


    expect(cache.get("key1")).not.toBeDefined();
    expect(cache.get("key2")).not.toBeDefined();
    expect(cache.get("key3")).not.toBeDefined();


    expect(cache.get("key")).toBeDefined();
    expect(cache.get("key4")).toBeDefined();
    expect(cache.redblack.count).toEqual(2);

  });

  it("test cache limit #2", function () {

    var cache  = new nodecache.Nodecache({limit: 6});

    expect(cache.redblack.limit).toEqual(6);

    spyOn(cache.redblack, "insert").andCallThrough();
    spyOn(cache.redblack, "delete").andCallThrough();

    expect(Object.keys(cache.array).length).toEqual(0);
   
    cache.put("key0", "keyvalue");
    cache.put("key01", "keyvalue");
    expect(cache.redblack.count).toEqual(2);
    expect(Object.keys(cache.array).length).toEqual(2);


    cache.put("key1", "one");
    expect(cache.redblack.count).toEqual(3);

    cache.put("key2", "two");
    expect(cache.redblack.count).toEqual(4);

    cache.put("key3", "three");
    expect(cache.redblack.count).toEqual(5);
    expect(Object.keys(cache.array).length).toEqual(5);

    var element = cache.get("key0");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["keyvalue"]);
    expect(cache.redblack.count).toEqual(5);

    element = cache.get("key2");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["two"]);

    cache.put("key4", "four");


    expect(cache.get("key1")).not.toBeDefined();
    expect(cache.get("key2")).not.toBeDefined();
    expect(cache.get("key3")).not.toBeDefined();


    expect(cache.get("key0")).not.toBeDefined();
    expect(cache.get("key01")).not.toBeDefined();
    expect(cache.redblack.count).toEqual(1);
    expect(Object.keys(cache.array).length).toEqual(1);

    expect(cache.get("key4")).toBeDefined();

  });


  it("test simple scenario", function () {

    var cache  = new nodecache.Nodecache({limit: 6});

    spyOn(cache.redblack, "insert").andCallThrough();
    spyOn(cache.redblack, "delete").andCallThrough();


    cache.put("test", " ");
    // INSERT 1
    expect(cache.redblack.insert.calls.length).toEqual(1);
    expect(cache.redblack.insert.calls[0].args[0]).toEqual(1);
    


    cache.put("test", " ");
    // INSERT 2
    expect(cache.redblack.insert.calls.length).toEqual(2);
    expect(cache.redblack.insert.calls[1].args[0]).toEqual(2);
    // DELETE 1
    expect(cache.redblack.delete.calls.length).toEqual(1);
    expect(cache.redblack.delete.calls[0].args[0]).toEqual(1);

    expect(cache.redblack.root.key).toEqual(2);
    expect(cache.redblack.root.left).toEqual(null);
    expect(cache.redblack.root.right).toEqual(null);

    expect(Object.keys(cache.array).length).toEqual(1);


    cache.put("test1", " ");
    // INSERT 1
    expect(cache.redblack.insert.calls.length).toEqual(3);
    expect(cache.redblack.insert.calls[2].args[0]).toEqual(1);
    expect(cache.redblack.delete.calls.length).toEqual(1);
  });

  it("real case #2", function () {


    var cache  = new nodecache.Nodecache({limit: 6});
    
    cache.put("don", "k");
    // don = 1
    expect(cache.redblack.count).toEqual(1);

    cache.put("dont", "k");
    // dont = 1
    expect(cache.redblack.count).toEqual(2);

    cache.put("donner", "k");
    // dois = 1
    expect(cache.redblack.count).toEqual(3);

    cache.put("dois", "k");
    // dois = 1
    expect(cache.redblack.count).toEqual(4);

    cache.put("don", "k");
    // don = 1 == 2
    expect(cache.redblack.count).toEqual(1);

    cache.put("dormais", "k");
    // dormais = 1

    cache.put("docteurs", "k");
    // docteurs = 1 = 0


    cache.put("dont", "k");


    

    //KEY ==> don || VALUE ==> keyvalue
    //INSERT ==> 1
    //KEY ==> dont || VALUE ==> keyvalue
    //INSERT ==> 1
    //KEY ==> donner || VALUE ==> keyvalue
    //INSERT ==> 1
    //KEY ==> dois || VALUE ==> keyvalue
    //INSERT ==> 1
    //KEY ==> don || VALUE ==> keyvalue
    //DELETE ==> 1
    //INSERT ==> 2
    //KEY ==> dormais || VALUE ==> keyvalue
    //INSERT ==> 1
    //KEY ==> docteurs || VALUE ==> keyvalue
    //INSERT ==> 1
    //DELETE ==> 1
    //KEY ==> dont || VALUE ==> keyvalue
    //DELETE ==> 1
    //INSERT ==> 2
    //DELETE ==> 2
    //7


  });

//  it("real case", function () {
//
//    console.log("\n\n\n************************************");
//    var cache  = new nodecache.Nodecache({limit: 6});
//    var fileread = false;
//
//    var array = [];
//    fs.readFile("test/spec/testarray.txt", 'utf8', function (err,data) {
//      if(data) {
//        array = data.toString().split('\n'); // find position of new line element
//        fileread = true;
//      }
//    });
//
//
//    waitsFor(function () {
//      return fileread == true;
//    }, "File never read", 2000);
//
//    runs(function () {
//
//      expect(array.length).not.toEqual(0);
//
//      for(var i = 0; i < array.length; i++) {
//
//        if(i <= 7) {
//          debugger;
//          cache.put(array[i], "keyvalue");
//          if(cache.redblack.root == null) {
//            console.log(i);
//          }
//        }
//      }
//
//      var allkeys = Object.keys(cache.array);
//      debugger;
//      
//    });
//
//  });




});
