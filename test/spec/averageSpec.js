var nodecache = require('../../lib/node-cache');

describe("Average", function () {
  it("test average - simple case", function () {
    var cache = new nodecache.Nodecache({maxsize: 1000});
    cache.put(1000, "key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(1000);

    cache.put(1000, "key3", "1234567890123456");
    expect(cache.status.memorysize).toEqual(41);
    expect(cache.status.average).toEqual(1000);
  });

  it("test average - simple case #2", function () {
    var cache = new nodecache.Nodecache({maxsize: 1000});
    cache.put(1000, "key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(1000);

    cache.put(2000, "key3", "1234567890123456");
    expect(cache.status.memorysize).toEqual(41);
    expect(cache.status.average).toEqual(1500);
  });

  it("test average - simple case #3", function () {
    var cache = new nodecache.Nodecache({maxsize: 1000});
    cache.put(1000, "key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(1000);

    cache.put(2001, "key3", "1234567890123456");
    expect(cache.status.memorysize).toEqual(41);
    expect(cache.status.average).toEqual(1500);
  });

  it("test average - simple case #4", function () {
    var cache = new nodecache.Nodecache({maxsize: 1000});
    cache.put(1000, "key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(1000);

    cache.put(2001, "key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(2001);
  });


  it("test average - put no ranking", function () {
    var cache = new nodecache.Nodecache({maxsize: 1000});
    cache.put("key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(1);

    cache.put("key3", "123456789012345");
    expect(cache.status.average).toEqual(1);
    expect(cache.status.memorysize).toEqual(40);
  });

  it("test average - put no ranking - ADD - ADD", function () {
    var cache = new nodecache.Nodecache({maxsize: 1000});
    cache.put("key2", "123456789012345");
    expect(cache.status.memorysize).toEqual(20);
    expect(cache.status.average).toEqual(1);

    cache.put("key2", "123456789012345");
    expect(cache.status.average).toEqual(2);
    expect(cache.status.memorysize).toEqual(20);
  });


});
