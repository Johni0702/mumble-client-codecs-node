# mumble-client-codecs-node

This module provides the [Opus codec] for the [mumble-client] module for use with nodejs.
Neither CELT nor Speex are supported at this time.
When native libraries are unacceptable (e.g. in a browser), consider using [mumble-client-codecs-browser] instead.

### Usage

```javascript
var NodeCodecs = require('mumble-client-codecs-node')

var client = new MumbleClient({
  username: 'Test',
  codecs: NodeCodecs
})
```

### License
MIT

[Opus codec]: https://github.com/Rantanen/node-opus
[mumble-client]: https://github.com/johni0702/mumble-client
[mumble-client-codecs-browser]: https://github.com/johni0702/mumble-client-codecs-browser
