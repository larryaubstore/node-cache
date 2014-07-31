var nodecache = require('../../lib/node-cache');


describe("Put key/value/ranking tests", function () {

  it("Add a key", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache, "cleanarray").andCallFake(function () {});
    cache.put(1000, "key", "keyvalue");

    var element = cache.get("key");

    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1000);
    expect(element.value).toEqual("keyvalue");

    expect(cache.status.memorysize).toEqual(12);
    expect(cache.cleanarray).toHaveBeenCalled();

    expect(cache.cleanarray.mostRecentCall.args[0]).toEqual(0);

  });

  it("cleanarray method test", function () {

    var cache = new nodecache.Nodecache();
    cache.status.average = 2001;
    cache.status.count = 4;

    cache.array["first"]   = {ranking: 1000, value: "firstvalue"};
    cache.array["second"]  = {ranking: 2000, value: "secondvalue"};
    cache.array["third"]   = {ranking: 3000, value: "thirdvalue"};
    cache.array["fourth"]  = {ranking: 4000, value: "fourthvalue"};


    cache.cleanarray(10000);
    expect(cache.array["first"]).toBeUndefined();
    expect(cache.array["second"]).toBeUndefined();
    expect(cache.array["third"]).not.toBeUndefined();
    expect(cache.array["fourth"]).not.toBeUndefined();
  });
});
