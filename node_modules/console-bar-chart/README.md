# How To Install

```sh
npm install console-bar-chart
```

# How To Use

```js
const barChart = require('console-bar-chart')

let data = {
  "label"  : ["2000","2001","2002","2020"],
  "value" : [1,5,3,2],
};

barChart.draw(data);
```
# Output
```sh
    5        ||||             
    4        ||||             
    3        ||||  ||||       
    2        ||||  ||||  |||| 
    1  ||||  ||||  ||||  |||| 
      2000   2001   2002  2020  

```
###### Notice
```
  This module is not yet completely done.
  _Please contact the developer for suggestions and improvements._
```


