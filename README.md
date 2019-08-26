# About this version
Add a key `sourceIdSuffix` in option for generating multiple draw instance.

Example: 
```js
let draw = new MapboxDraw();
let draw2 = new MapboxDraw({
  sourceIdSuffix: "copy"
})
map.addControl(draw);
map.addControl(draw2);
```
The suffix will be added to events, sources and layers' ids, so no more id conflict.