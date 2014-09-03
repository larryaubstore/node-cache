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

    var cache  = new nodecache.Nodecache({limit: 5});

    expect(cache.redblack.limit).toEqual(5);

    spyOn(cache.redblack, "insert").andCallThrough();
    spyOn(cache.redblack, "delete").andCallThrough();

   
    cache.put("key", "keyvalue");
    cache.put("key", "keyvalue");
    expect(cache.redblack.count).toEqual(1);

    cache.put("key1", "one");
    expect(cache.redblack.count).toEqual(2);

    cache.put("key2", "two");
    expect(cache.redblack.count).toEqual(3);

    cache.put("key3", "three");
    expect(cache.redblack.count).toEqual(4);


    var element = cache.get("key");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(2);
    expect(element.value).toEqual(["keyvalue", "keyvalue"]);
    expect(cache.redblack.count).toEqual(4);

    element = cache.get("key2");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["two"]);

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

  it("real case", function () {

    var fileread = false;

    var array = [];
    fs.readFile("test/spec/testarray.txt", 'utf8', function (err,data) {

      debugger;
      if(data) {
        array = data.toString().split('\n'); // find position of new line element
        fileread = true;
      }

    });


    waitsFor(function () {
      return fileread == true;
    }, "File never read", 2000);

    runs(function () {

      expect(array.length).not.toEqual(0);
    });

  });




});
