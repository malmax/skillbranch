import _ from 'lodash';
import fs from 'fs';
import Path from 'path';

class Parser {

  constructor(path = '.') {
    if (!fs.existsSync(path)) {
      throw global.console.error(`not exist ${path}`);
    }

    const data = [];

    fs.readdirSync(path)
      .filter(file => /\.env$/i.test(file))
      .forEach((file) => {
        const d = fs.readFileSync(Path.join(path, file), 'utf8');
        data.push(d);
      });

    this.data = data.join('\n');
    this.parsed = {};
  }

  parse() {
    if (!/=/.test(this.data)) {
      throw global.console.error(`empty data ${this.data}`);
    }

    const lines = _.split(this.data, '\n');
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

const p = new Parser('.');

console.log(p.parse());
