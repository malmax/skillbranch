'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
  function Parser() {
    _classCallCheck(this, Parser);

    this.data = '';
    this.parsed = {};
  }

  _createClass(Parser, [{
    key: 'readDir',
    value: function readDir(path) {
      this.data = '';
      var data = [];

      if (!_fs2.default.existsSync(path)) {
        throw global.console.error('not exist ' + path);
      }

      _fs2.default.readdirSync(path).filter(function (file) {
        return (/\.env$/i.test(file)
        );
      }).forEach(function (file) {
        var d = _fs2.default.readFileSync(_path2.default.join(path, file), 'utf8');
        data.push(d);
      });

      this.data = data.join('\n');
      return this;
    }
  }, {
    key: 'readFile',
    value: function readFile(path) {
      if (!_fs2.default.existsSync(path)) {
        throw global.console.error('not exist ' + path);
      }

      this.data = _fs2.default.readFileSync(path, 'utf8');
      return this;
    }
  }, {
    key: 'parse',
    value: function parse() {
      if (!/=/.test(this.data)) {
        throw global.console.error('empty data ' + this.data);
      }

      var lines = _lodash2.default.split(this.data, '\n');

      // почему-то выдает ошибку если сделать _.split.map
      var objs = _lodash2.default.map(lines, this.parseLine);
      this.parsed = _lodash2.default.merge.apply(_lodash2.default, [{}].concat(_toConsumableArray(objs)));
      return this.parsed;
    }
  }, {
    key: 'parseLine',
    value: function parseLine(line) {
      var lineSplited = _lodash2.default.split(line, '=', 2);
      if (!lineSplited[0]) return {};

      return _lodash2.default.zipObjectDeep([lineSplited[0]], [lineSplited[1]]);
    }
  }]);

  return Parser;
}();

var p = new Parser();

// Task 1
global.console.log('Task1: parse config2.env', p.readFile('config2.env').parse());

// Task 2
global.console.log('Task2: read .env from .', p.readDir('.').parse());

// Task 3
global.console.log('Task 3: process.env + .env from . dir', Object.assign({}, process.env, p.readDir('.').parse()));