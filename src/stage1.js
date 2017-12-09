(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("stage1",
{ "height":9,
 "layers":[
        {
         "data":[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
         "height":9,
         "name":"back",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":100,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 0, 0, 0, 0, 9, 0, 0, 10, 11, 0, 0, 0, 9, 0, 0, 0, 9, 0, 0, 10, 11, 0, 0, 9, 0, 0, 0, 0, 9, 0, 10, 11, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 10, 11, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 0, 0, 10, 11, 0, 0, 0, 9, 0, 0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 9, 0, 0, 0, 0, 9, 0, 10, 11, 0, 0, 9, 0, 0, 0, 0, 9, 0, 0, 0, 10, 11, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 15, 17, 18, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":9,
         "name":"background",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":100,
         "x":0,
         "y":0
        }, 
        {
         "data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 3, 0, 0, 0, 2, 0, 0, 0, 3, 2, 0, 0, 0, 3, 0, 0, 2, 0, 0, 0, 0, 2, 0, 3, 0, 0, 2, 0, 0, 0, 2, 0, 2, 0, 0, 3, 0, 0, 2, 0, 0, 0, 3, 0, 2, 0, 0, 0, 0, 2, 0, 3, 0, 2, 0, 0, 3, 0, 0, 2, 0, 0, 0, 2, 0, 3, 0, 2, 0, 0, 2, 0, 3, 0, 0, 2, 0, 3, 0, 2, 0, 0, 3, 0, 0, 2, 0, 3, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         "height":9,
         "name":"foreground",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":100,
         "x":0,
         "y":0
        }, 
        {
         "data":[41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 33, 33, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 33, 33, 33, 33, 33, 41, 41, 41, 41, 33, 33, 33, 33, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 42, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 42, 42, 41, 41, 42, 0, 0, 0, 0, 42, 41, 42, 41, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 34, 35, 35, 0, 0, 0, 0, 0, 0, 35, 34, 35, 35, 34, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 35, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 35, 35, 34, 34, 35, 35, 34, 34, 35, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 33, 33, 33, 33, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34],
         "height":9,
         "name":"block",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":100,
         "x":0,
         "y":0
        }, 
        {
         "draworder":"topdown",
         "name":"event",
         "objects":[
                {
                 "height":16,
                 "id":11,
                 "name":"start",
                 "properties":
                    {
                     "speed":0.25
                    },
                 "propertytypes":
                    {
                     "speed":"float"
                    },
                 "rotation":0,
                 "type":"speed",
                 "visible":true,
                 "width":16,
                 "x":0,
                 "y":0
                }, 
                {
                 "height":16,
                 "id":13,
                 "name":"stop",
                 "properties":
                    {
                     "speed":0
                    },
                 "propertytypes":
                    {
                     "speed":"float"
                    },
                 "rotation":0,
                 "type":"speed",
                 "visible":true,
                 "width":16,
                 "x":1536,
                 "y":0
                }, 
                {
                 "height":16,
                 "id":14,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":240,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":15,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":256,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":16,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":272,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":17,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":304,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":18,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":320,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":19,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":352,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":20,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":352,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":21,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":384,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":22,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":400,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":23,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":416,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":24,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":448,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":25,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":464,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":26,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":464,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":27,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":496,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":28,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":512,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":29,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":544,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":30,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":592,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":31,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":608,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":32,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":656,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":33,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":672,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":34,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":688,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":35,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":704,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":36,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":736,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":37,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":800,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":38,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":816,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":39,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":848,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":40,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":864,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":41,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":880,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":42,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":896,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":43,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":928,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":44,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":928,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":45,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":944,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":46,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":992,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":47,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1008,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":48,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1024,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":49,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1136,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":50,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1152,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":51,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1152,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":52,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1216,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":53,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1216,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":54,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1232,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":55,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1248,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":56,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1280,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":57,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1296,
                 "y":64
                }, 
                {
                 "height":16,
                 "id":58,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1296,
                 "y":96
                }, 
                {
                 "height":16,
                 "id":59,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1328,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":60,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1328,
                 "y":32
                }, 
                {
                 "height":16,
                 "id":61,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1360,
                 "y":80
                }, 
                {
                 "height":16,
                 "id":62,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1360,
                 "y":48
                }, 
                {
                 "height":16,
                 "id":63,
                 "name":"dragonfly",
                 "rotation":0,
                 "type":"enemy",
                 "visible":true,
                 "width":16,
                 "x":1376,
                 "y":32
                }],
         "opacity":1,
         "type":"objectgroup",
         "visible":true,
         "x":0,
         "y":0
        }],
 "nextobjectid":64,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.0.3",
 "tileheight":16,
 "tilesets":[
        {
         "columns":8,
         "firstgid":1,
         "image":"images\/back.png",
         "imageheight":128,
         "imagewidth":128,
         "margin":0,
         "name":"back",
         "spacing":0,
         "tilecount":64,
         "tileheight":16,
         "tiles":
            {
             "32":
                {
                 "objectgroup":
                    {
                     "draworder":"index",
                     "name":"",
                     "objects":[
                            {
                             "height":16,
                             "id":1,
                             "name":"collision",
                             "rotation":0,
                             "type":"collision",
                             "visible":true,
                             "width":16,
                             "x":0,
                             "y":0
                            }],
                     "opacity":1,
                     "type":"objectgroup",
                     "visible":true,
                     "x":0,
                     "y":0
                    }
                },
             "33":
                {
                 "objectgroup":
                    {
                     "draworder":"index",
                     "name":"",
                     "objects":[
                            {
                             "height":16,
                             "id":1,
                             "name":"collision",
                             "rotation":0,
                             "type":"collision",
                             "visible":true,
                             "width":16,
                             "x":0,
                             "y":0
                            }],
                     "opacity":1,
                     "type":"objectgroup",
                     "visible":true,
                     "x":0,
                     "y":0
                    }
                },
             "34":
                {
                 "objectgroup":
                    {
                     "draworder":"index",
                     "name":"",
                     "objects":[
                            {
                             "height":8,
                             "id":1,
                             "name":"collision",
                             "rotation":0,
                             "type":"collision",
                             "visible":true,
                             "width":16,
                             "x":0,
                             "y":8
                            }],
                     "opacity":1,
                     "type":"objectgroup",
                     "visible":true,
                     "x":0,
                     "y":0
                    }
                },
             "40":
                {
                 "objectgroup":
                    {
                     "draworder":"index",
                     "name":"",
                     "objects":[
                            {
                             "height":16,
                             "id":1,
                             "name":"collision",
                             "rotation":0,
                             "type":"collision",
                             "visible":true,
                             "width":16,
                             "x":0,
                             "y":0
                            }],
                     "opacity":1,
                     "type":"objectgroup",
                     "visible":true,
                     "x":0,
                     "y":0
                    }
                },
             "41":
                {
                 "objectgroup":
                    {
                     "draworder":"index",
                     "name":"",
                     "objects":[
                            {
                             "height":8,
                             "id":1,
                             "name":"collision",
                             "rotation":0,
                             "type":"collision",
                             "visible":true,
                             "width":16,
                             "x":0,
                             "y":0
                            }],
                     "opacity":1,
                     "type":"objectgroup",
                     "visible":true,
                     "x":0,
                     "y":0
                    }
                },
             "42":
                {
                 "objectgroup":
                    {
                     "draworder":"index",
                     "name":"",
                     "objects":[
                            {
                             "height":16,
                             "id":1,
                             "name":"collision",
                             "rotation":0,
                             "type":"collision",
                             "visible":true,
                             "width":16,
                             "x":0,
                             "y":0
                            }],
                     "opacity":1,
                     "type":"objectgroup",
                     "visible":true,
                     "x":0,
                     "y":0
                    }
                }
            },
         "tilewidth":16,
         "transparentcolor":"#ff00ff"
        }],
 "tilewidth":16,
 "type":"map",
 "version":1,
 "width":100
});