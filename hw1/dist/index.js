'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use((0, _cors2.default)());
app.get('/task1', function (req, res) {
  var a = req.query.a && parseFloat(req.query.a, 10) || 0;
  var b = req.query.b && parseFloat(req.query.b, 10) || 0;

  var sum = a + b;
  res.send(sum.toString());
});

app.listen(3000, function () {
  global.console.log('listen 3000 port');
});