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
      description     : 'required|string',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = Update;
