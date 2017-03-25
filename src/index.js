import _ from 'lodash';
import fs from 'fs';
import Path from 'path';

class Parser {

  constructor() {
    this.data = '';
    this.parsed = {};
  }

  readDir(path) {
    this.data = '';
    const data = [];

    if (!fs.existsSync(path)) {
      throw global.console.error(`not exist ${path}`);
    }

    fs.readdirSync(path)
      .filter(file => /\.env$/i.test(file))
      .forEach((file) => {
        const d = fs.readFileSync(Path.join(path, file), 'utf8');
        data.push(d);
      });

    this.data = data.join('\n');
    return this;
  }

  readFile(path) {
    if (!fs.existsSync(path)) {
      throw global.console.error(`not exist ${path}`);
    }

    this.data = fs.readFileSync(path, 'utf8');
    return this;
  }

  parse() {
    if (!/=/.test(this.data)) {
      throw global.console.error(`empty data ${this.data}`);
    }

    const lines = _.split(this.data, '\n');

    // почему-то выдает ошибку если сделать _.split.map
    const objs = _.map(lines, this.parseLine);
    this.parsed = _.merge({}, ...objs);
    return this.parsed;
  }

  parseLine(line) {
    const lineSplited = _.split(line, '=', 2);
    if (!lineSplited[0]) return {};

    return _.zipObjectDeep([lineSplited[0]], [lineSplited[1]]);
  }

}

const p = new Parser();

// Task 1
global.console.log('Task1: parse config2.env', p.readFile('config2.env').parse());

// Task 2
global.console.log('Task2: read .env from .', p.readDir('.').parse());

// Task 3
global.console.log('Task 3: process.env + .env from . dir',
 Object.assign({}, process.env, p.readDir('.').parse()));
