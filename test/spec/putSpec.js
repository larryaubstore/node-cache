var nodecache = require('../../lib/node-cache');


describe("Put key/value/ranking tests", function () {

  it("Add a key", function () {


    var cache  = new nodecache.Nodecache();
    cache.put(1000, "key", "keyvalue");

    var element = cache.get("key");

    expect(element).not.toBeUndefined();
    expect(element.ranking).toEqual(1000);
    expect(element.value).toEqual("keyvalue");

    expect(cache.status.memorysize).toEqual(12);

  });


  
});
