node-cache
==========

Node.js in-memory cache

# Design goals

1. Keep only fresh and top-ranked keys.
2. General philosophy is to minimize management (key deletion, tree rebalancing).

# Design details 

- Cache size limit is configurable.

# Usage

## Key definition

  * key (string). 
  * value (object).
  * ranking (int)

## Options

  * maxsize: Cache size.  

## Cache instantiation 

```javascript

  var nodecache = require('node-cache');
  var cache = new nodecache.Nodecache({ limit: 100 });
```

## Add a key

```javascript
  // Insert a key with a rank value of 1000
  cache.put("akey", "keyvalue");

  var element = cache.get("akey");
  element.ranking == 1;

  cache.put("akey", "keyvalue");
  element = cache.get("akey");
  element.ranking == 2;
```

## Get a key 

```javascript
  // element.ranking  => 1000 
  // element.value    => "keyvalue" 
  var element = cache.get("akey");
```


## Add a key with a specific ranking

***Not implemented yet***

```javascript
  // Insert a key with a rank value of 1000
  cache.put(1000, "akey", "keyvalue");
```


