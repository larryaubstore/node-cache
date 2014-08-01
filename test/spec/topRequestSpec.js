var nodecache = require('../../lib/node-cache');


describe("Put key/value/ranking tests", function () {

  it("Add one top key", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache, "cleanarray").andCallFake(function () {});
    cache.addtoprequestkey("key");
    expect(cache.toprequestkey["key"]).toEqual(1);
  });

  it("Add six top keys", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache, "cleanarray").andCallFake(function () {});
    cache.addtoprequestkey("key1");
    cache.addtoprequestkey("key2");
    cache.addtoprequestkey("key3");
    cache.addtoprequestkey("key4");
    cache.addtoprequestkey("key5");
    cache.addtoprequestkey("key6");

    expect(cache.toprequestkey["key1"]).toEqual(1);
    expect(cache.toprequestkey["key2"]).toEqual(1);
    expect(cache.toprequestkey["key3"]).toEqual(1);
    expect(cache.toprequestkey["key4"]).toEqual(1);
    expect(cache.toprequestkey["key5"]).toEqual(1);

    expect(cache.toprequestkeycandidates["key6"]).toEqual(1);
  });

  it("Test toprequestkeycandidates limit", function () {

    var cache  = new nodecache.Nodecache();

    spyOn(cache, "cleanarray").andCallFake(function () {});
    cache.addtoprequestkey("key1");
    cache.addtoprequestkey("key2");
    cache.addtoprequestkey("key3");
    cache.addtoprequestkey("key4");
    cache.addtoprequestkey("key5");
    cache.addtoprequestkey("key6");
    cache.addtoprequestkey("key7");
    cache.addtoprequestkey("key8");
    cache.addtoprequestkey("key9");
    cache.addtoprequestkey("key10");
    cache.addtoprequestkey("key11");

    expect(cache.toprequestkey["key1"]).toEqual(1);
    expect(cache.toprequestkey["key2"]).toEqual(1);
    expect(cache.toprequestkey["key3"]).toEqual(1);
    expect(cache.toprequestkey["key4"]).toEqual(1);
    expect(cache.toprequestkey["key5"]).toEqual(1);

    var test = Object.keys(cache.toprequestkeycandidates);
    expect(cache.toprequestkeycandidates["key6"]).toBeUndefined();
  });

});

