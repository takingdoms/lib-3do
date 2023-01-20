# Example:
```js
const fs = require('fs');
const { Parse3do } = require('@takingdoms/lib-3do');

const data = fs.readFileSync('path/to/object-file.3do');
const view = new DataView(data.buffer);
const result = Parse3do.fromBuffer(view);

console.log(result);
```
