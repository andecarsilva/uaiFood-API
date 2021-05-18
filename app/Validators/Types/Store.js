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
      type         : 'required|string|unique:type_of_foods,type',
      description  : 'required|string',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Store;
