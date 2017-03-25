import _ from 'lodash';
import fs from 'fs';

const data = fs.readFileSync('./.env.example', 'utf8');

export default class Parser {

  parseLine(line) {
    return {};
  }

}

console.log(data);
