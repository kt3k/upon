# upon.js v0.0.0

> Promise-like event binding.

This is extremely experimental.

# Usage

This jquery plugin add 2 methods to jquery object; `upon` and `apart`.

Basic example:

```
$('#id').upon('click').then(function (data) {

    var dom = data.dom;
    var event = data.event;

    // process here

}).then(function () {

    // another process

}).fail(function () {

    // fail handling

});
```

The above works like as if `$('#id').upon('click')` was an promise object. But the difference is that the handlers registered above will work every time when an event fired, not only one time like promise.


If you want remove *upon* handlers:

```

$('#id').apart('click');

```
