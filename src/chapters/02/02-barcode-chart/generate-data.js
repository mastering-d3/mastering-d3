
var fs = require('fs');

function randomExponential(lambda) {
  var u = Math.random(),
      x = -lambda * Math.log(u);
  return Math.floor(x);
}

var data = [],
    N = 200,
    lambda = 15 * 60e3,
    t = new Date(),
    p = 100;

for (var k = 0; k < N; k += 1) {
  t = new Date(t.getTime() + randomExponential(lambda));
  data.push({
    date: t.toDateString(),
    time: t.toTimeString(),
    price: p + 1e-2 * p * (1 - Math.random())
  });
}

fs.writeFile('data.json', JSON.stringify(data, null, 2));
