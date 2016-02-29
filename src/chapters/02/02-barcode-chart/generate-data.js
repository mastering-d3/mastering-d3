
function randomExponential(lambda) {
  var u = Math.random(),
      x = Math.log(u - 1) / -lambda;
  return Math.floor(x);
}

function randomDelta(x) {
  return Math.random() * x / 100;
}

var data = [],
    lambda = 1 / (15 * 60e3),
    n = 300;

var p = 150,
    dp = 1 - 2 * Math.random(),
    t = new Date();

for (var k = 0; k < n; k += 1) {



  data.push({
    price: p,
    date:
  });

  dp = 1 - 2 * Math.random();
  p = p + dp;
}
