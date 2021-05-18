'use strict';

class Store {
  async authorize() {
    return true;
  }

  get validateAll() {
    return true;
  }

  get rules() {
    return {
      restaurant_id   : 'required|integer|unique:menus,restaurant_id',
      description     : 'required|string',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Store;
