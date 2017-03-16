import ApiClientBase from 'lego-starter-kit/CoreApp/api/api.client';
import _ from 'lodash';

export default class ApiClient extends ApiClientBase {
  throwError({ err }) {
    console.log('throwError', err);
    const message = err && err.message || err;
    const error = new Error(_.isPlainObject(message) ? JSON.stringify(message) : message);

    const title = err && err.statusText || 'Ошибка';
    const text = err && err.data && err.data.message || error.message;

    global.toast({
      title,
      text,
    });
  }

  async getUser(body) {
    const res = await this.fetch('/user/get', {
      method: 'POST',
      body,
    });
    return res.data;
  }

  async userEdit(body) {
    const res = await this.fetch('/user/edit', {
      method: 'POST',
      body,
    });
    return res;
  }

}
