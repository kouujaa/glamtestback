# Querystring API (QSAPI) 

A querystring API specification and implementation

## Specification

### Filtering

**Find all records with k1 value = v1**
```
?filter[k1]=v1
```

**Find all records with k1 = v1 AND k2 = v2**
```
?filter[k1]=v1&filter[k2]=v2
```

**Find all records with k >= v**
```
?filter[k][gte]=v
```

Valid comparative operators are:
   * `eq` - equals (the default)
   * `gt` - greater than
   * `gte` - greater than or equal
   * `lt` - less than
   * `lte` - less than or equal
   * `ne` - not equals
   * 'contains'  [@todo: not yet implemented]
   
**Find all records using logical OR instead of AND**

```
?filter[k1]=v1&filter[k2]=v2&operator=or
```

### Field-limiting / projection

**For all records found, deliver only the fields `k1`, `k2`, and `k3`**
```
?fields=k1,k2,k3
```

Note that you can use embedded fields.
 
**For all records returned, deliver only the field `deeply.embedded.key`**

```
?fields=deeply.embedded.key

```

In the absence of any projecton/field-limiting, all fields and deep structure are returned. 

### Ordering / Sorting

**Order results by field `k` ascending**
```$xslt
?order=k:asc
```

**Order results by field `k` descending**
```
?order=k:desc
```

Note that you can do compund orderings:

**Order results by field `k1` ascending, then `k2` descending**
```
?order=k1:asc,k2:desc
```

Also supported is the use of `1` for `asc` and `-1` for `desc`:

```
?order=k1:1,k2:-1
```
 
### Pagination

**Return page 3 with 5 results per-page**
```
?limit=5&page=3
```

Note that we will probably implement a default `limit`, most likely 10 (@todo). So, 
the following two would then be equivalent:  

```
?page=3&limit=10
?page=3
```

Naturally, `page` defaults to `1`


## Usage

## Direct usage
```
import qsapi from './path/to/qsapi'

// Querystring to parse
const querystring = 'filter[k1]=v1&filter[k2]=v2&order=k3:asc&limit=10&page=1

// Get a structure representing the semantics of the query and use it as you like.
try {
    const struct = qsapi.parse(querystring)
} catch (err) {
    // probably throw a 400 Bad Request to indicate to the client that
    // his querystring usage was invalid
}

// Alternatively, mongofy it to create an object whose 
// data is ready to be dropped directly into a MongoDB query
// A mongo `schema` is necessary in order to cast strings from the 
// querysting parsing into the datatype MongoDB is expecting.
const mongofier = new qsapi.mongofier(schema)
const mongofied = mongofier.mongofy(struct)
const query = model
    .find(mongofied.conditions, mongofied.fields)
    .sort(mongofied.sort)
    .limit(mongofied.limit)
    .skip(mongofied.skip)
```

### Generic GET Handler

There is also a generic GET handler intended for plural GET endpoints - `/users`, for example, 
might benefit from filtering, field-limitations, ordering, and pagination.

In your plugin registration, do something like this:

```
import import factory from 'path/to/get-handler-factory'

const register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/my-plural-route',
    config: {
      handler: factory.buildHandler(MyModel)
    }
  })
  next()
}

```

where `MyModel` is the Mongoose model that services this plural route. The factory will build a 
handler using parses the query-string, applies those params to a Mongoose query, executes
  the query, and then replies to the client.