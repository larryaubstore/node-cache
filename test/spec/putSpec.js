var nodecache = require('../../lib/node-cache');


describe("Put key/value/ranking tests", function () {

  it("Add a key", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache.redblack, "insert").andCallThrough();

    cache.put("key", "keyvalue");

    var element = cache.get("key");

    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual("keyvalue");

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
    expect(element.value).toEqual("keyvalue");

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
    expect(element.value).toEqual("keyvalue");
    expect(cache.redblack.count).toEqual(4);

    element = cache.get("key2");
    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1);
    expect(element.value).toEqual("two");

    cache.put("key4", "four");


    expect(cache.get("key1")).not.toBeDefined();
    expect(cache.get("key2")).not.toBeDefined();
    expect(cache.get("key3")).not.toBeDefined();


    expect(cache.get("key")).toBeDefined();
    expect(cache.get("key4")).toBeDefined();
    expect(cache.redblack.count).toEqual(2);


//    expect(cache.redblack.insert).toHaveBeenCalled();
//    expect(cache.redblack.insert.calls[0].args[0]).toEqual(1);
//    expect(cache.redblack.insert.calls[0].args[1]).toEqual("key");
//    expect(cache.redblack.delete).not.toHaveBeenCalled();
//
//    cache.put("key", "keyvalue");
//    expect(cache.redblack.delete).toHaveBeenCalled();
//    expect(cache.redblack.insert.calls.length).toEqual(2);
//    expect(cache.redblack.getnode(2)).toBeDefined();
  });


//  it("Add a key without ranking", function () {
//
//    var cache  = new nodecache.Nodecache();
//
//    cache.put("key", "keyvalue");
//
//    var element = cache.get("key");
//    expect(element).not.toBeUndefined();
//    expect(element.ranking).toEqual(1);
//    expect(element.value).toEqual("keyvalue");
//
//    cache.put("key", "keyvalue");
//    element = cache.get("key");
//    expect(element).not.toBeUndefined();
//    expect(element.ranking).toEqual(2);
//    expect(element.value).toEqual("keyvalue");
//
//
//
//  });
//
//  it("cleanarray method test", function () {
//
//    var cache = new nodecache.Nodecache();
//    cache.status.average = 2501;
//    cache.status.count = 400;
//
//    cache.array["first"]   = {ranking: 1000, value: "firstvalue"};
//    cache.array["second"]  = {ranking: 2000, value: "secondvalue"};
//    cache.array["third"]   = {ranking: 3000, value: "thirdvalue"};
//    cache.array["fourth"]  = {ranking: 4000, value: "fourthvalue"};
//
//
//    cache.cleanarray(10000);
//    expect(cache.array["first"]).toBeUndefined();
//    expect(cache.array["second"]).toBeUndefined();
//    expect(cache.array["third"]).not.toBeUndefined();
//    expect(cache.array["fourth"]).not.toBeUndefined();
//  });
//
//  it("cleaning ratio test", function () {
//
//    var cache = new nodecache.Nodecache({maxsize: 100});
//
//    spyOn(cache, "cleanarray").andCallThrough();
//    cache.put(1000, "key", "keyvalue");
//    expect(cache.cleanarray).toHaveBeenCalled();
//    expect(cache.cleanarray.mostRecentCall.args[0]).toEqual(0);
//
//    cache.put(1000, "key2", "1234567890123456789012345678901");
//    expect(cache.cleanarray).toHaveBeenCalled();
//    expect(cache.cleanarray.mostRecentCall.args[0]).toEqual(0);
//
//    cache.put(1000, "key3", "1");
//    expect(cache.cleanarray).toHaveBeenCalled();
//    expect(cache.cleanarray.mostRecentCall.args[0]).toEqual(1);
//  });
//
//  it("memorysize property decreased", function () {
//    var cache = new nodecache.Nodecache({maxsize: 30});
//    cache.put(1000, "key2", "123456789012345");
//    expect(cache.status.memorysize).toEqual(20);
//    expect(cache.status.average).toEqual(1000);
//
//    cache.put(2000, "key3", "1234567890123456");
//    expect(cache.status.memorysize).toEqual(21);
//    expect(cache.status.average).toEqual(2000);
//  });



});
