node-cache
==========

Node.js in-memory cache

# Design goals

1. Keep only fresh and top-ranked keys.
2. General philosophy is to minimize management (key deletion, bucket operation).
   Management is increased only when the cache gets closer of its limit. 
3. Bucket for top-requested key with no value is maintained.
4. Bucket for top-ranked key is maintained.

# Design details 

- Cache size limit is configurable.
- Elements below the ranking average could potentially be deleted. 
- Cache management is proportional to cache usage. 
  * For example, 5% means that 5% of all the keys are verified on each PUT operations.
    * 30% and less: 0%
    * 50% and less: 0.01%
    * 60% and less: 0.01%
    * 70% and less: 0.1%
    * 80% and less: 0.3%
    * 85% and less: 0.5% 
    * 87% and less: 1%
    * 90% and less: 2%
    * 92% and less: 5%
    * 95% and less: 10%
    * 100% and less: 50%
- Keys expired after a time interval.

# Usage

## Key definition

  * key (string). 
  * value (object).
  * ranking (int). The ranking is used mainly for key deletion.

## Options

  * maxsize: Cache size.  
  * toplistlimit: the bucket size is used for two list. The list who maintains the key with highest ranking and for list who contains the "candidates" elements are using the 'toplistlimit' option. 

## Cache instantiation 

```javascript

  var nodecache = require('./lib/node-cache');
  var cache = new nodecache.Nodecache({ maxsize: 1024 * 1024 * 100 });
```

## Add a key 

```javascript
  // Insert a key with a rank value of 1000
  cache.put(1000, "akey", "keyvalue");
```

## Get a key 

```javascript
  // element.ranking  => 1000 
  // element.value    => "keyvalue" 
  var element = cache.get("akey");
```
