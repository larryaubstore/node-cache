var nodecache = require('../../lib/node-cache');
var fs        = require('fs');


describe("Put key/value/ranking tests", function () {


  it("test cache limit", function () {

    var cache  = new nodecache.Nodecache({limit: 6});

    expect(cache.redblack.limit).toEqual(6);

    spyOn(cache.redblack, "insert").andCallThrough();
    spyOn(cache.redblack, "delete").andCallThrough();

   
    cache.put("key", "keyvalue");
    cache.put("key", "keyvalue");
    expect(cache.redblack.getnode(1)).toEqual(null);


    expect(cache.redblack.count).toEqual(1);
    expect(cache.redblack.root.key).toEqual(2);
    expect(cache.redblack.root.value).toEqual(["key"]);
  

    expect(Object.keys(cache.array).length).toEqual(1);
    expect(cache.get("key").value).toEqual(["keyvalue"]);

    cache.put("key1", "one");
    expect(cache.redblack.count).toEqual(2);

    expect(cache.redblack.getnode(1).key).toEqual(1);
    expect(cache.redblack.getnode(1).value).toEqual(["key1"]);

    cache.put("key2", "two");
    expect(cache.redblack.count).toEqual(3);
    expect(cache.redblack.getnode(1).value).toEqual(["key1", "key2"]);

    cache.put("key3", "three");
    expect(cache.redblack.count).toEqual(4);
    expect(cache.redblack.getnode(1).value).toEqual(["key1", "key2", "key3"]);

    var element = cache.get("key");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(2);
    expect(element.value).toEqual(["keyvalue"]);
    expect(cache.redblack.count).toEqual(4);

    element = cache.get("key2");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual(["two"]);

    cache.put("key4", "four");
    expect(cache.redblack.count).toEqual(5);
    expect(cache.redblack.getnode(1).value).toEqual(["key1", "key2", "key3", "key4"]);

    cache.put("key4", "four");
    expect(cache.redblack.getnode(1).value).toEqual(["key1", "key2", "key3"]);
    expect(cache.redblack.count).toEqual(5);

    cache.put("key5", "four");
    expect(cache.redblack.count).toEqual(2);


    expect(cache.get("key1")).not.toBeDefined();
    expect(cache.get("key2")).not.toBeDefined();
    expect(cache.get("key3")).not.toBeDefined();
    expect(cache.get("key5")).not.toBeDefined();


    expect(cache.get("key")).toBeDefined();
    expect(cache.get("key4")).toBeDefined();
    expect(cache.redblack.count).toEqual(2);

  });








});
