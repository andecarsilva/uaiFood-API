'use strict';

class Update {
  async authorize() {
    return true;
  }

  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name         : 'required|string',
      description  : 'required|string',
      price        : 'required',
      promotion     : 'required'
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Update;
